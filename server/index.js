const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const mongoose = require ('mongoose');
const User = require('./schema/user'); 
const Members = require('./schema/members'); 
const Expense = require('./schema/expense'); 
const Plan = require('./schema/plan');

const cors = require('cors'); // cors 모듈 추가
const { default: axios } = require('axios');
const { getKakaoToken } = require('./getKakaoToken');
app.use(express.json()); // JSON 요청 본문 파싱 설정
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials:true})); // 모든 출처에서의 요청을 허용
app.options('*', cors());


mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.9lscnbf.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/',(req, res) => {
    res.send('hello word');
});


app.get('/user', async (req, res) => {
    try {
        // 토큰 유효성검증을 통해 토큰이 만료되었다면 새로 발급
        let accessToken = req.cookies.access_token
        const expiresIn = req.cookies.expires_in;
        const refreshToken = req.cookies.refresh_token;
        const refreshTokenExpiresIn = req.cookies.refresh_token_expires_in;
        // console.log(accessToken, expiresIn,refreshToken, refreshTokenExpiresIn, '쿠키?'); 
        // console.log(Date.now() > + expiresIn,Date.now(), expiresIn, '토큰만료?');  
        // console.log(Date.now() < + refreshTokenExpiresIn, Date.now(), refreshTokenExpiresIn,'리프레시 토큰만료?');  
        if (expiresIn && Date.now() > + expiresIn) {
            // 토큰의 유효시간이 지났다면 리프레시토큰을 확인한다
            // 만약 리프레쉬 토큰이 만료되지 않았다면 토큰 갱신 요청
            console.log('토큰유효시간지남');
            if (
                refreshToken &&
                refreshTokenExpiresIn &&
                Date.now() < + refreshTokenExpiresIn
            ) {
                console.log('리프레시토큰유효시간지남');
                const {newToken, expires_in, refresh_token, refresh_token_expires_in} = await getKakaoToken(req, refreshToken);
                if(newToken &&  expiresIn &&  refresh_token && refresh_token_expires_in) {
                    res.cookie('access_token', newToken, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true});
                    res.cookie('expires_in', Date.now() + expires_in * 1000, { httpOnly: true,});        
                    res.cookie('refresh_token_expires_in', Date.now() + refresh_token_expires_in * 1000 , { httpOnly: true });
                    res.cookie('refresh_token', refresh_token, { httpOnly: true,});
                    accessToken = newToken; //새로받은 newToken으로 할당 (jwt로 변환되어있음);
                }
            // 리프레쉬 토큰도 만료된 경우 모든 토큰 삭제
            } else {
                res.cookie('access_token', '', { expires: new Date(0) });
                res.cookie('expires_in', '', { expires: new Date(0) });
                res.cookie('refresh_token', '', { expires: new Date(0) });
                res.cookie('refresh_token_expires_in', '', { expires: new Date(0) });
                // clearTokenCookie(res);
                return res.status(401).json({ error: '토큰이 만료되었습니다. 다시 로그인하세요.' });
            }
        }     
        const {orginToken} = jwt.verify(accessToken, process.env.JWT_SECRET);
        // JWT 토큰 검증
        // 검증된 토큰 내의 orginToken을 이용하여 카카오로부터 받은 토큰 검증
        const {data} = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${orginToken}`,
                'Content-Type': 'application/json'
            }
        });
        // console.log(data,'kakako결과');
        const {id, properties} = data;
        if (!id) throw new Error('카카오 로그인 사용자 정보 오류');
        // 토큰 검증이 성공하면 프론트엔드에 응답
        res.status(200).json({idUser : id, nickname: properties.nickname});
    } catch (error) {
        console.error('사용자 검증 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


// 카카오 로그인
app.post('/user', async (req, res) => {
    try {
        const { 
            access_token, 
            refresh_token,
            refresh_token_expires_in, 
            expires_in, 
            nickname, 
            idUser 
            } = req.body;
        // console.log('처음 토큰',access_token);
        const {data} = await axios.get('https://kapi.kakao.com/v2/user/me', {headers : {'Authorization' : `Bearer ${access_token}`, 'Content-Type' : 'application/x-www-form-urlencoded'}});
        console.log('사용자 정보 response', data);
        if(data.id !== idUser) throw new Error('카카오 로그인  사용자 정보 오류');
        const existingUser = await User.findOne({ idUser });
        if (!existingUser) {
            const user = new User({ nickname, idUser });
            await user.save(); // 사용자 데이터를 데이터베이스에 저장
        }
    

        //받은 인가로 해당 유저 정보가 맞는지 확인
        const token = jwt.sign({orginToken: access_token }, process.env.JWT_SECRET, {
            expiresIn: '1h', // 토큰 유효 기간 설정 (예: 1시간)
        });
        // 쿠키에 설정
        res.cookie('expires_in',Date.now() + expires_in * 1000, { httpOnly: true,});        
        res.cookie('refresh_token', refresh_token, { httpOnly: true,});
        res.cookie('refresh_token_expires_in', Date.now() + refresh_token_expires_in * 1000, { httpOnly: true });
        res.cookie('access_token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true});
        res.status(200).json({idUser:data.id, nickname});
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

//카카오 로그아웃
app.post('/kakaoLogout', async (req, res) => {
    try {
        // const access_token = req.cookies.access_token;
        // const {orginToken} = jwt.verify(access_token, process.env.JWT_SECRET);
        // const result = await axios.post(`https://kapi.kakao.com/v1/user/logout`,{} ,{headers : {'Authorization': `Bearer ${orginToken}`,  'Content-Type': 'application/x-www-form-urlencoded',}});
        res.cookie('access_token', '', { expires: new Date(0) });
        res.cookie('expires_in', '', { expires: new Date(0) });
        res.cookie('refresh_token', '', { expires: new Date(0) });
        res.cookie('refresh_token_expires_in', '', { expires: new Date(0) });
        // clearTokenCookie(res);
        res.status(200).json({msg : '카카오 로그아웃 성공'});
    } catch (error) {
        console.error('사용자 로그아웃 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.get(`/groups`, async (req, res) => {
    try {
        const idUser = req.query.idUser; 
        const groupMembrs = await Members.find({
            idUser: idUser
        });
        res.status(201).json(groupMembrs); 
    } catch (error) {
        console.error('사용자 조회 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.delete(`/groups`, async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const groupName = req.query.groupName;
        const result1 = await Members.deleteMany({ idUser: idUser, groupName: groupName });
        const result2 = await Expense.deleteMany({ idUser: idUser, groupName: groupName });
        // console.log(result1, result2,'결과아');
        if (result1.acknowledged === true && result2.acknowledged === true) {
            const groupMembrs = await Members.find({
                idUser: idUser
            }) 
            // console.log('그룹 정보 가져오아', groupMembrs);
            res.status(201).json(groupMembrs); 
        }
    } catch (error) {
        console.error('사용자 삭제 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.get(`/members`, async (req, res) => {
    try {
        const idUser = req.query.idUser; 
        const groupMembrs = await Members.find({
            idUser: idUser
        })
        res.status(201).json(groupMembrs); 
    } catch (error) {
        console.error('멤버 조회 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.get(`/calendarGroups`, async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const createdAt = req.query.createdAt;
        const regexPattern = new RegExp("^" + createdAt); //yyyy-mm 맞는 정규 표현식생성
        const groupMembrs = await Members.find({
            $and: [
                { idUser:idUser }, 
                { createdAt: { $regex: regexPattern } }, 
        ]},);
        res.status(201).json(groupMembrs); 
    } catch (error) {
        console.error('캘린더 그룹 조회 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

//그룹 이름 중복되는지 확인
app.get(`/existingGroup`, async (req, res) => {
    try {
        const idUser = req.query.idUser; 
        const groupName = req.query.groupName; 

        const existingGroupName = await Members.findOne({    
            $and: [
                { idUser:idUser }, 
                { groupName: groupName }, 
        ]},);
        
        // console.log(existingGroupName,' 그룹이름', idUser, groupName);
        if (existingGroupName) {
            return res.status(400).json({ msg: '이미 해당 그룹이름이 존재합니다.'});
        }
        res.status(201).json({msg : '해당 그룹이름이 존재하지 않습니다.'}); 
    } catch (error) {
        console.error('존재하는 그룹 조회 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.post('/members', async (req, res) => {
    try {
        const { groupMembers, idUser, groupName, createdAt } = req.body;
        
        // console.log(groupMembers, idUser, groupName);
        const existingUser = await User.findOne({ idUser});
        if (!existingUser) {
            return res.status(302).json({ msg: '사용자 정보가 없습니다. 다시 로그인해주세요.' });
        }
        const members = new Members({ groupMembers, idUser, groupName, createdAt });
        await members.save(); 
        res.status(201).json(members); 
    } catch (error) {
        console.error('멤버 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.delete('/members', async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const groupName = req.query.groupName; 
        
        // console.log(idUser, groupName);
        const result1 = await Members.deleteOne({ idUser, groupName });
        const result2 = await Expense.deleteMany({ idUser, groupName });      
        return res.status(204).send(); // 삭제가 성공하면 빈 응답(204 No Content)을 보냅니다.
    } catch (error) {
        console.error('멤버 삭제 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.get(`/expense`, async (req, res) => {
    try {
        const idUser = req.query.idUser; 
        const groupName = req.query.groupName; 

        const allExpenses = await Expense.find({    
            $and: [
                { idUser:idUser }, 
                { groupName: groupName }, 
        ]},);
        // console.log(allExpenses, '찾은값');
        if (!allExpenses || allExpenses.length === 0) {
            return res.status(404).json({ msg: '데이터가 없습니다.' });
        }
        res.status(201).json(allExpenses); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('더치페이 조회 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

//expense 삭제하기
app.delete(`/expense`, async (req, res) => {
    try {
        const idUser = req.query.idUser; 
        const groupName = req.query.groupName;
        const expenseName = req.query.expenseName; 
        // console.log(idUser, groupName, expenseName, '정보');
        const result = await Expense.deleteOne({
            $and: [
                {idUser : idUser}, 
                {groupName: groupName}, 
                {desc:expenseName}
            ]
        });
        console.log(result,'expense 삭제정보');
        if(result.deletedCount === 1 && result.acknowledged === true ) {
            const allExpenses = await Expense.find({    
                $and: [
                    { idUser:idUser }, 
                    { groupName: groupName }, 
            ]},);
            // console.log(allExpenses, '찾은값');
            if (!allExpenses || allExpenses.length === 0) {
                return res.status(201).json({ msg: '데이터가 없습니다.' });
            }
            // console.log(allExpenses,'삭제후 정보');
            res.status(201).json(allExpenses); // 저장된 사용자 데이터를 JSON 형식으로 응답
        }
    } catch (error) {
        console.error('더치페이 삭제 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.post('/expense', async (req, res) => {
    try {
        const {groupName, idUser,  desc, date, amount, payer } = req.body;
        // console.log(groupName, idUser,  desc, date, amount, payer) ;
        const expense = await Expense({groupName, idUser,  desc, date, amount, payer});
        await expense.save(); 
        res.status(201).json({msg:'expense저장 성공'}); 
    } catch (error) {
        console.error('더치페이 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// 계획api
app.get('/calendar', async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const date = req.query.date;
        const regexPattern = new RegExp("^" + date); //yyyy-mm 맞는 정규 표현식생성
        const planRecord = await Plan.find({
            $and: [
                { idUser:idUser }, 
                { date: { $regex: regexPattern } }, 
        ]},);
        res.status(201).json(planRecord); 
    } catch (error) {
        console.error('달력계획 가져오기 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.get('/plan', async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const date = req.query.date;
        // const regexPattern = new RegExp("^" + date); //yyyy-mm 맞는 정규 표현식생성
        const planRecord = await Plan.find({
            $and: [
                { idUser:idUser }, 
                { date:  date }, 
        ]},);
        // console.log('plan결과',planRecord, date);
        res.status(201).json(planRecord); 
    } catch (error) {
        console.error('계획 가져오기 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.post('/plan', async (req, res) => {
    try {
        const {title, date, departure,  arrive, startTime, endTime, content, idUser  } = req.body;
        // console.log(groupName, idUser,  desc, date, amount, payer) ;
        const plan = new Plan({title, date, departure, arrive, startTime, endTime, content, idUser});
        const result =  await plan.save(); 
        // console.log('plan result', result );
        res.status(201).json({msg:'계획 생성 성공'});
    } catch (error) {
        console.error('계획 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.put('/plan/:id', async (req, res) => {
    try {
        const { title, date, departure, arrive, startTime, endTime, content } = req.body;
        const planId = req.params.id;
        // Update할 필드들을 객체로 만듭니다.
        const updatePlan = {
            title,
            date,
            departure,
            arrive,
            startTime,
            endTime,
            content,
        };
        // Mongoose의 findByIdAndUpdate 메서드를 사용하여 업데이트합니다.
        const result = await Plan.findByIdAndUpdate(planId, updatePlan, { new: true });
        // console.log(result, '찾은결과');
        if (!result) {
            // ID에 해당하는 Plan이 없는 경우
            return res.status(404).json({ message: '해당하는 계획이 없습니다.', errorCode: 404, });
        }
        res.status(200).json({statusCode : 200,  message: '계획 수정 성공', result : {updatedPlan: result}});
    } catch (error) {
        console.error('계획 수정 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.delete('/plan/:id', async (req, res) => {
    try {
        const planId = req.params.id;
        console.log(req.params.id,'id삭제');
        // Update할 필드들을 객체로 만듭니다.
        // Mongoose의 findByIdAndUpdate 메서드를 사용하여 업데이트합니다.
        const result = await Plan.deleteOne({_id : planId});
        // console.log(result, '찾은결과');
        if (!result || result.deletedCount === 0) {
            // 삭제한 plan이 없는경우
            return res.status(404).json({ message: '해당하는 계획이 없습니다.', errorCode: 404, });
        }
        res.status(200).json({statusCode : 200,  message: '계획 삭제 성공',});
    }catch (error) {
        console.error('계획 수정 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }

})
;
app.listen(port, () => {
    console.log(`listening localhost://:${port}`);
});

const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const mongoose = require ('mongoose');
const User = require('./schema/user'); // User 모델 가져오기
const Members = require('./schema/members'); // User 모델 가져오기
const Expense = require('./schema/expense'); // User 모델 가져오기
const Plan = require('./schema/plan');

const cors = require('cors'); // cors 모듈 추가
const { default: axios } = require('axios');
const { refreshKakaoToken } = require('./refreshToken');
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
        console.log(req.cookies,'쿠키값들');
        const accessToken = req.cookies.access_token
        const expiresIn = req.cookies.expires_in;
        const refreshToken = req.cookies.refresh_token;
        const refreshTokenExpiresIn = req.cookies.refresh_token_expires_in;
        console.log(accessToken, expiresIn,refreshToken, refreshTokenExpiresIn, '쿠키?'); 
        // console.log(Date.now() > + expiresIn,Date.now(), expiresIn, '토큰만료?');  
        // console.log(Date.now() < + refreshTokenExpiresIn, Date.now(), refreshTokenExpiresIn,'리프레시 토큰만료?');  
        if (expiresIn && Date.now() > + expiresIn) {
            // 토큰의 유효시간이 지났다면 들어옴
            // 만약 리프레쉬 토큰이 만료되지 않았다면 토큰 갱신 요청
            if (
                refreshToken &&
                refreshTokenExpiresIn &&
                Date.now() < + refreshTokenExpiresIn
            ) {
                const result = await refreshKakaoToken(req, refreshToken);
                console.log('토큰갱신', result);
            // 리프레쉬 토큰도 만료된 경우 모든 토큰 삭제
            } else {
                //만료된 경우 클라이언트에게 다시로그인해달라고 해야함!
                return res.status(401).json({ error: '토큰이 만료되었습니다. 다시 로그인하세요.' });
            }
        }     
        const authorizationHeader = req.headers.authorization;

        const token = authorizationHeader.split(' ')[1];
        // console.log(accessToken);

        // JWT 토큰 검증
        const {orginToken} = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(orginToken,'decodeToken')
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
        res.status(200).json({id, nickname: properties.nickname});
    } catch (error) {
        console.error('사용자 검증 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


// 사용자 데이터 삽입을 처리하는 라우트 생성
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

        const {data} = await axios.get('https://kapi.kakao.com/v2/user/me', {headers : {'Authorization' : `Bearer ${access_token}`, 'Content-Type' : 'application/json'}});
        if(data.id !== idUser) throw new Error('카카오 로그인  사용자 정보 오류');
        const existingUser = await User.findOne({ idUser });
        if (!existingUser) {
            const user = new User({ access_token, refresh_token, nickname, idUser });
            await user.save(); // 사용자 데이터를 데이터베이스에 저장
        }
        //받은 인가로 해당 유저 정보가 맞는지 확인
        const token = jwt.sign({orginToken: access_token }, process.env.JWT_SECRET, {
            expiresIn: '1h', // 토큰 유효 기간 설정 (예: 1시간)
        });
        // 쿠키에 설정
        // 쿠키를 설정하면 클라이언트에서 확인이 불가하다?
        res.cookie('expires_in', Date.now() + expires_in * 1000, { httpOnly: true,});        
        res.cookie('refresh_token', refresh_token, { httpOnly: true,});
        res.cookie('refresh_token_expires_in', Date.now() + refresh_token_expires_in * 1000 , { httpOnly: true });
        res.cookie('access_token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true});
                
        res.status(200).json({idUser:data.id, nickname, token});
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.get(`/groups`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupMembrs = await Members.find({
            idUser: idUser
        });
        res.status(201).json(groupMembrs); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.delete(`/groups`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupName = req.query.groupName;
        const result1 = await Members.deleteMany({ idUser: idUser, groupName: groupName });
        const result2 = await Expense.deleteMany({ idUser: idUser, groupName: groupName });
        console.log(result1, result2,'결과아');
        if (result1.acknowledged === true && result2.acknowledged === true) {
            const groupMembrs = await Members.find({
                idUser: idUser
            }) 
            console.log('그룹 정보 가져오아', groupMembrs);
            res.status(201).json(groupMembrs); // 저장된 사용자 데이터를 JSON 형식으로 응답
        }
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.get(`/members`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupMembrs = await Members.find({
            idUser: idUser
        })
        res.status(201).json(groupMembrs); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.get(`/calendarGroups`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const createdAt = req.query.createdAt; // 두 번째 조건 파라미터
        const regexPattern = new RegExp("^" + createdAt); //yyyy-mm 맞는 정규 표현식생성
        const groupMembrs = await Members.find({
            $and: [
                { idUser:idUser }, // 첫 번째 조건 필드
                { createdAt: { $regex: regexPattern } }, // 두 번째 조건 필드
        ]},);
        res.status(201).json(groupMembrs); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

//그룹 이름 중복되는지 확인
app.get(`/existingGroup`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupName = req.query.groupName; // 두 번째 조건 파라미터

        const existingGroupName = await Members.findOne({    
            $and: [
                { idUser:idUser }, // 첫 번째 조건 필드
                { groupName: groupName }, // 두 번째 조건 필드
        ]},);
        
        // console.log(existingGroupName,' 그룹이름', idUser, groupName);
        if (existingGroupName) {
            return res.status(400).json({ msg: '이미 해당 그룹이름이 존재합니다.'});
        }
        res.status(201).json({msg : '해당 그룹이름이 존재하지 않습니다.'}); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.post('/members', async (req, res) => {
    try {
        const { groupMembers, idUser, groupName, createdAt } = req.body;
        
        console.log(groupMembers, idUser, groupName);
        const existingUser = await User.findOne({ idUser});
        if (!existingUser) {
            return res.status(302).json({ msg: '사용자 정보가 없습니다. 다시 로그인해주세요.' });
        }
        const members = new Members({ groupMembers, idUser, groupName, createdAt });
        await members.save(); // 사용자 데이터를 데이터베이스에 저장
        res.status(201).json(members); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('멤버 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.delete('/members', async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const groupName = req.query.groupName; 
        
        console.log(idUser, groupName);
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
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupName = req.query.groupName; // 두 번째 조건 파라미터

        const allExpenses = await Expense.find({    
            $and: [
                { idUser:idUser }, // 첫 번째 조건 필드
                { groupName: groupName }, // 두 번째 조건 필드
        ]},);
        // console.log(allExpenses, '찾은값');
        if (!allExpenses || allExpenses.length === 0) {
            return res.status(404).json({ msg: '데이터가 없습니다.' });
        }
        res.status(201).json(allExpenses); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

//expense 삭제하기
app.delete(`/expense`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupName = req.query.groupName; // 두 번째 조건 파라미터
        const expenseName = req.query.expenseName; // 두 번째 조건 파라미터
        console.log(idUser, groupName, expenseName, '정보');
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
                    { idUser:idUser }, // 첫 번째 조건 필드
                    { groupName: groupName }, // 두 번째 조건 필드
            ]},);
            // console.log(allExpenses, '찾은값');
            if (!allExpenses || allExpenses.length === 0) {
                return res.status(201).json({ msg: '데이터가 없습니다.' });
            }
            console.log(allExpenses,'삭제후 정보');
            res.status(201).json(allExpenses); // 저장된 사용자 데이터를 JSON 형식으로 응답
        }
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


app.post('/expense', async (req, res) => {
    try {
        const {groupName, idUser,  desc, date, amount, payer } = req.body;
        // console.log(groupName, idUser,  desc, date, amount, payer) ;
        const expense = new Expense({groupName, idUser,  desc, date, amount, payer});
        await expense.save(); // 사용자 데이터를 데이터베이스에 저장
        res.status(201).json(); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.post('/plan', async (req, res) => {
    try {
        const {title, date, departure,  arrive, stratTime, endTime, content  } = req.body;
        // console.log(groupName, idUser,  desc, date, amount, payer) ;
        const plan = new Plan({title, date, departure, arrive, stratTime, endTime, content});
        await plan.save(); // 사용자 데이터를 데이터베이스에 저장
        res.status(201).json(); // 저장된 사용자 데이터를 JSON 형식으로 응답
    } catch (error) {
        console.error('사용자 생성 오류:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

app.listen(port, () => {
    console.log(`listening localhost://:${port}`);
});

// 사용자 데이터 삽입을 처리하는 라우트 생성


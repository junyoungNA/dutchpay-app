const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
const jwt = require('jsonwebtoken');


const mongoose = require ('mongoose');
const User = require('./schema/user'); // User 모델 가져오기
const Members = require('./schema/members'); // User 모델 가져오기
const Expense = require('./schema/expense'); // User 모델 가져오기
const Plan = require('./schema/plan');

const cors = require('cors'); // cors 모듈 추가
app.use(cors()); // 모든 출처에서의 요청을 허용
app.use(express.json()); // JSON 요청 본문 파싱 설정


mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.9lscnbf.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/',(req, res) => {
    res.send('hello word');
})



// function verifyToken(clientToken, kakaoAccessToken) {
//     try {
//         const decoded = jwt.verify(clientToken, process.env.JWT_SECRET);
//         if (decoded.originToken === kakaoAccessToken) {
//         // 클라이언트로부터 받은 accessToken과 일치
//         return true;
//         } else {
//         return false;
//         }
//     } catch (error) {
//         console.log(error, '토큰 디코딩 실패 및 오류');
//         return false;
//     }
// }

// const clientToken = req.body.token; // 클라이언트에서 전송한 JWT 토큰
// const kakaoAccessToken = existingUser.accessToken; // 서버에 저장된 카카오 로그인 accessToken

// if (verifyToken(clientToken, kakaoAccessToken)) {
//   // JWT 토큰이 유효하고 accessToken과 일치함
//   res.status(200).json({ message: 'JWT 토큰 검증 성공' });
// } else {
//   // JWT 토큰이 유효하지 않거나 accessToken과 일치하지 않음
//   res.status(401).json({ message: 'JWT 토큰 검증 실패' });
// }

    
// 사용자 데이터 삽입을 처리하는 라우트 생성
app.post('/user', async (req, res) => {
    try {
        const { accessToken, nickname, idUser } = req.body;

        const existingUser = await User.findOne({ idUser });
        if (!existingUser) {
            const user = new User({ accessToken, nickname, idUser });
            await user.save(); // 사용자 데이터를 데이터베이스에 저장
        } 
        // const token = jwt.sign({  orginToken: accessToken }, process.env.JWT_SECRET, {
        //     expiresIn: '1h', // 토큰 유효 기간 설정 (예: 1시간)
        // });
        res.status(200).json({ message: 'Kakao 로그인이 성공했습니다' })
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
        })
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
        console.log(groupName, groupName.length, '그룹이름');
        const result1 = await Members.deleteMany({ idUser: idUser, groupName: groupName });
        const result2 = await Expense.deleteMany({ idUser: idUser, groupName: groupName });
        console.log(result1, result2, '결과');

        // res.status(201).json(groupMembrs); // 저장된 사용자 데이터를 JSON 형식으로 응답
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
        console.log(result1);      
        console.log( result2);      
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
        const refinedExpenses = allExpenses.map(({groupName,idUser, desc, date ,amount, payer}) => {
            return {
                groupName: groupName,
                idUser: idUser,
                desc:desc,
                date: date,
                amount: amount,
                payer:payer,
            };
        });
        res.status(201).json(refinedExpenses); // 저장된 사용자 데이터를 JSON 형식으로 응답
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


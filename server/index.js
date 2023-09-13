const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();

const mongoose = require ('mongoose');
const User = require('./schema/user'); // User 모델 가져오기
const Members = require('./schema/members'); // User 모델 가져오기
const Expense = require('./schema/expense'); // User 모델 가져오기

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

    
// 사용자 데이터 삽입을 처리하는 라우트 생성
app.post('/user', async (req, res) => {
    try {
        const { accessToken, nickname, idUser } = req.body;

        const existingUser = await User.findOne({ idUser });
        if (existingUser) {
            return res.status(200).json({ msg: '사용자가 이미 저장되어 있습니다.' });
        }
        const user = new User({ accessToken, nickname, idUser });
        await user.save(); // 사용자 데이터를 데이터베이스에 저장
        res.status(201).json(user); // 저장된 사용자 데이터를 JSON 형식으로 응답
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
        
        console.log(existingGroupName,' 그룹이름', idUser, groupName);
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

app.get(`/expense`, async (req, res) => {
    try {
        const idUser = req.query.idUser; // 첫 번째 조건 파라미터
        const groupName = req.query.groupName; // 두 번째 조건 파라미터

        const allExpenses = await Expense.find({    
            $and: [
                { idUser:idUser }, // 첫 번째 조건 필드
                { groupName: groupName }, // 두 번째 조건 필드
        ]},);
        // console.log(idUser,'index 유저 id');
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

app.listen(port, () => {
    console.log(`listening localhost://:${port}`);
});

// 사용자 데이터 삽입을 처리하는 라우트 생성


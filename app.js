const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const morgan = require('morgan');
const controller = require('./controllers');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 홈
app.get('/', (req, res) => {
  res.send("Hello world!");
});

// 유저인포
app.get('/users', (req, res) => {
  res.status(200).json({
    id: "PK",
    password: "password",
    email: "email",
    nickname : "nickname",
    });
});

// 로그인
app.post('/users/signin', controller.signin);

// 로그아웃
app.post('/users/signout', controller.signout);

// 회원가입
app.post('/users/signup', controller.signup);

// 질문-대답세트
app.get('/answer/:userid', controller.answer);

// 질문
app.get('/question', controller.question);

// 비밀번호 변경
app.post('/users/:userid/update', controller.update);

// 회원탈퇴
app.delete('/users/:userid/delete', controller.delete);


app.listen(port, () => {
  console.log(`server start at ${port}`);
});

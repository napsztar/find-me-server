const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
let func = function () {
  let foo = 'abc11';
  return foo;
};

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
app.post('/users/signin', (req, res) => {
  res.status(200).send("Signin is successed");
});

// 로그아웃
app.post('/users/signout', (req, res) => {
  res.status(200).send("successfully signed out!");
});

// 회원가입
app.post('/users/signup', (req, res) => {
  res.status(201).send("Signup is successed");
});

// 질문-대답세트
app.get('/answer/:userid', (req, res) => {
  res.status(200).send("Success");
});

// 질문
app.get('/question', (req, res) => {
  res.status(200).json({
    id: "PK",
    content : "content"
    });
});

// 비밀번호 변경
app.post('/users/:userid/update', (req, res) => {
  res.status(200).send("Password is successfully changed");
});

// 회원탈퇴
app.delete('/users/:userid/delete', (req, res) => {
  res.status(200).send("Account is successfully deleted");
});


app.listen(port, () => {
  console.log(`server start at ${port}`);
});

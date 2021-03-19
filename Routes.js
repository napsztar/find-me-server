const express = require('express');
const router = express.Router();
const controller = require('./controllers');

// 유저정보 조회
router.get('/:userid', controller.userinfo);

// 로그인
router.post('/signin', controller.signin);

// 로그아웃
router.post('/signout', controller.signout);

// 회원가입
router.post('/signup', controller.signup);

// 비밀번호 변경
router.post('/:userid/update', controller.update);

// 회원탈퇴
router.delete('/:userid/delete', controller.delete);

module.exports = router;

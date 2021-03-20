const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// 유저정보 조회
router.get('/:userid', userController.userinfo);

// 로그인
router.post('/signin', userController.signin);

// 로그아웃
router.post('/signout', userController.signout);

// 회원가입
router.post('/signup', userController.signup);

// 비밀번호 변경
router.post('/:userid/update', userController.update);

// 회원탈퇴
router.delete('/:userid/delete', userController.delete);

module.exports = router;

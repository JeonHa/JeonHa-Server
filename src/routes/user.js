var express = require('express');
var router = express.Router();

const userController = require('../controller/userController')

// 로그인

// 회원가입
router.post('/signup', userController.postUserSignup);
// 아이디 중복체크

module.exports = router;
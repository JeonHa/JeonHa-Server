var express = require('express');
var router = express.Router();

const { authCheck } = require('../library/jwt')
const userController = require('../controller/userController')

// 로그인
router.post('/signin', userController.postUserSignin)
    // 회원가입
router.post('/signup', userController.postUserSignup);
// 아이디 중복체크
router.get('/check', userController.getIdCheck);
// 스탬프 확인
router.get('/stamp', authCheck, userController.getStamp);
// 한옥 예약 확인
router.get('/hanok', authCheck, userController.getHanokReservation);
// // 클래스 예약 확인
// router.get('/class', authCheck, userController.getClassReservation);

module.exports = router;
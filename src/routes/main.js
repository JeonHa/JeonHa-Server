var express = require('express');
var router = express.Router();

const { authCheck, isLogin } = require('../library/jwt')
const userController = require('../controller/userController');

// 메인화면 조회
router.get('/', isLogin, userController.getMain);

module.exports = router;
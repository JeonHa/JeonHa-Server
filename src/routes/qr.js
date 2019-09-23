var express = require('express');
var router = express.Router();

const { authCheck } = require('../library/jwt')
const qrController = require('../controller/qrController')

// qr 확인
router.post('/:url', authCheck, qrController.postStamp);

module.exports = router;
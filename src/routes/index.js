var express = require('express');
var router = express.Router();

router.use('/user', require('./user'))
router.use('/hanok', require('./hanok'))
router.use('/qr', require('./qr'))
router.use('/class', require('./class'))
router.use('/main', require('./main'))

module.exports = router;
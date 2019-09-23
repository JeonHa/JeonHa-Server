var express = require('express');
var router = express.Router();

router.use('/user', require('./user'))
router.use('/hanok', require('./hanok'))
router.use('/qr', require('./qr'))

module.exports = router;
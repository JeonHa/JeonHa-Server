var express = require('express');
var router = express.Router();


router.use('/user', require('./user'))
router.use('/hanok', require('./hanok'))

module.exports = router;
var express = require('express');
var router = express.Router();

const classController = require('../controller/classController')

router.post('/:weekIdx/reservation', classController.postClassReservation);
router.get('/:classIdx', classController.getClassDetail);
router.get('/', classController.getClassList);

module.exports = router;
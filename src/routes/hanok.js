var express = require('express');
var router = express.Router();

const hanokController = require('../controller/hanokController')

router.get('/:hanokIdx/reservation', hanokController.postHanokReservation);
router.get('/:hanokIdx', hanokController.getHanokDetail);
router.get('/', hanokController.getHanokMapList);

module.exports = router;
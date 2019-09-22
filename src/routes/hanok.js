var express = require('express');
var router = express.Router();

const hanokController = require('../controller/hanokController')

router.get('/test/:userIdx', hanokController.tokenGenerator);
router.delete('/:hanokIdx/reservation/:userIdx', hanokController.hanokReservationDelete);
router.post('/:hanokIdx/reservation', hanokController.postHanokReservation);
router.get('/:hanokIdx', hanokController.getHanokDetail);
router.get('/', hanokController.getHanokMapList);
module.exports = router;
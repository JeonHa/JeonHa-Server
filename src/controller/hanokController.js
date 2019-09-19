const { response, errResponse } = require('../library/response')
const returnCode = require('../library/returnCode')

const hanokService = require('../service/hanokService');

async function getHanokMapList(req, res) {
    try {
        if (req.query.type == 'map') {
            console.log('hanokMapController');
            hanokService.getHanokMap();
            response(res, returnCode.OK, '한옥 맵 성공');
        } else if (req.query.type == 'list') {    
            console.log('hanokListController');
            const sortType = req.query.sort;
            hanokService.getListMap(sortType);
            response(res, returnCode.OK, '한옥 리스트 성공');
        } else {
            console.log(error.message);
            errResponse(res, returnCode.BAD_REQUEST, 'URL 쿼리 오류');
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '한옥 오류');
    }
}

async function getHanokDetail(req, res) {
    try {
        const hanokIdx = req.params.hanokIdx
        hanokService.getHanokDetail(hanokIdx);
        response(res, returnCode.OK, '한옥 세부사항 성공');
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '한옥 세부사항 오류');
    }
}

async function postHanokReservation(req, res) {
    try {
        const hanokIdx = req.params.hanokIdx;
        hanokService.postHanokReservation(hanokIdx);
        response(res, returnCode.CREATED, '한옥 예약 성공');
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '한옥 예약 오류')
    }
}

module.exports = {
    getHanokMapList, getHanokDetail, postHanokReservation 
}
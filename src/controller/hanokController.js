const { response, errResponse } = require('../library/response')
const { sign, verify } = require('../library/jwt');
const returnCode = require('../library/returnCode')
const hanokService = require('../service/hanokService');

async function getHanokMapList(req, res) {
    try {
        if (req.query.type == 'map') {
            const hanokData = await hanokService.getHanokMap();
            response(res, returnCode.OK, '한옥 맵 성공', hanokData);
        } else if (req.query.type == 'list') {    
            console.log('hanokListController');
            const sortType = req.query.sort;
            const hanokList = await hanokService.getHanokList(sortType);
            response(res, returnCode.OK, '한옥 리스트 성공', hanokList);
        } else {
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
        const hanokDetail = await hanokService.getHanokDetail(hanokIdx);
        response(res, returnCode.OK, '한옥 세부사항 성공', hanokDetail);
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '한옥 세부사항 오류');
    }
}

async function postHanokReservation(req, res) {
    try {
        let decode = verify(req.headers.authorization);
        if (decode == -2) {
            errResponse(res, returnCode.NOT_FOUND, '토큰 값 오류');
        } else {
            const userIdx = decode.idx;
            const hanokIdx = req.params.hanokIdx;
            const hanokResponse = await hanokService.postHanokReservation(hanokIdx, userIdx);
            if (hanokResponse) {
                response(res, returnCode.CREATED, '한옥 예약 성공');
            } else {
                response(res, returnCode.NO_CONTENT, '이미 신청한 예약입니다');
            }
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '한옥 예약 오류')
    }
}

//테스트용 토큰 생성기
async function tokenGenerator(req, res) {
    const tokenData = await sign(req.params.userIdx);
    console.log(tokenData);
    response(res, returnCode.OK, '토큰 발급 성공', tokenData);
} 

//테스트용 한옥 예약 삭제
async function hanokReservationDelete(req, res) {
    await hanokService.hanokReservationDelete(req.params.userIdx, req.params.hanokIdx);
    response(res, returnCode.OK, '한옥 예약 삭제');
}

module.exports = {
    getHanokMapList, 
    getHanokDetail, 
    postHanokReservation, 
    tokenGenerator, 
    hanokReservationDelete
}
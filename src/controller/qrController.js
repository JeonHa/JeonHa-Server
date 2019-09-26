const { response, errResponse } = require('../library/response')
const returnCode = require('../library/returnCode')

const reservationService = require('../service/reservationService');

async function postStamp(req, res) {
    try {
        const result = await reservationService.postStamp(req.user.idx, req.body.url);

        if (result == 304) {
            response(res, returnCode.ACCEPTED, '스탬프 등록: 이미 처리한 예약입니다');
        } else if (result == 400) {
            errResponse(res, returnCode.BAD_REQUEST, '스탬프 등록: 예약하지 않은 한옥/클래스입니다.');
        } else {
            response(res, returnCode.CREATED, '스탬프 등록 성공');
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '스탬프 등록 에러');
    }
}

module.exports = {
    postStamp,
}
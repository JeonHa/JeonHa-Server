const { response, errResponse } = require('../library/response')
const returnCode = require('../library/returnCode')

const reservationService = require('../service/reservationService');

async function postStamp(req, res) {
    try {
        await reservationService.postStamp(req.user.idx, req.body.url);
        response(res, returnCode.CREATED, '스탬프 등록 성공');
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '스탬프 등록 에러');
    }
}

module.exports = {
    postStamp,
}
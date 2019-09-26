const { response, errResponse } = require('../library/response');
const jwt  = require('../library/jwt');
const returnCode = require('../library/returnCode')
const classService = require('../service/classService');

async function getClassList(req, res) {
    try {
        const classList = await classService.getClassList(req.query.day);

        response(res, returnCode.OK, '클래스 리스트 성공', classList);

    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '클래스 오류');
    }
}

async function getClassDetail(req, res) {
    try {
        const classIdx = req.params.classIdx
        const classDetail = await classService.getClassDetail(classIdx);
        response(res, returnCode.OK, '클래스 세부사항 성공', classDetail);
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '클래스 세부사항 오류');
    }
}

async function postClassReservation(req, res) {
    try {
        let decode = jwt.verify(req.headers.authorization);
        if (decode == -2) {
            errResponse(res, returnCode.NOT_FOUND, '토큰 값 오류');
        } else {
            const userIdx = decode.idx;
            const classIdx = req.params.classIdx;
            const classResponse = await classService.postClassReservation(classIdx, userIdx);
            if (classResponse) {
                response(res, returnCode.CREATED, '클래스 예약 성공');
            } else {
                response(res, returnCode.NO_CONTENT, '이미 신청한 예약입니다');
            }
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '클래스 예약 오류')
    }
}


module.exports = {
    getClassList,
    getClassDetail,
    postClassReservation
}
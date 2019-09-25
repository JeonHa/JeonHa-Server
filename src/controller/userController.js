const { response, errResponse } = require('../library/response')
const returnCode = require('../library/returnCode')

const { sign } = require('../library/jwt');
const userService = require('../service/userService');
const reservationService = require('../service/reservationService');

async function postUserSignup(req, res) {
    try {
        const user = await userService.postUserSignup(req.body);

        response(res, returnCode.CREATED, '회원가입 성공', { 'authorization': sign(user.insertId) });
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '회원 가입 에러')
    }
}

async function getIdCheck(req, res) {
    try {
        const is_used = await userService.getIdCheck(req.query.id);

        if (!is_used) {
            response(res, returnCode.OK, '사용할 수 있는 아이디입니다');
        } else {
            errResponse(res, returnCode.BAD_REQUEST, '이미 있는 아이디입니다');
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '아이디 중복 확인 에러')
    }
}

async function postUserSignin(req, res) {
    try {
        const userIdx = await userService.postUserSignin(req.body);

        if (userIdx != 0) {
            response(res, returnCode.OK, '로그인 완료', { 'authorization': sign(userIdx) });
        } else {
            errResponse(res, returnCode.BAD_REQUEST, '아이디/비밀번호가 일치하지 않습니다');
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '로그인 에러')
    }
}

async function getStamp(req, res) {
    try {
        const stampList = await reservationService.getStamp(req.user.idx);
        response(res, returnCode.OK, '스템프 가져오기 성공', stampList);
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '스탬프 가져오기 에러');
    }
}

async function getReservation(req, res) {
    try {
        if (req.query.type == 'hanok') {
            const hanokReservation = await reservationService.getHanokReservationList(req.user.idx);
            response(res, returnCode.OK, '예약:한옥 가져오기 성공', hanokReservation);
        } else if (req.query.type == 'class') {
            const classReservation = await reservationService.getClassReservationList(req.user.idx);
            response(res, returnCode.OK, '예약:클래스 가져오기 성공', classReservation);
        } else {
            errResponse(res, returnCode.BAD_REQUEST, '잘못된 예약 타입 입니다');
        }
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '예약 조회 에러');
    }

}

module.exports = {
    postUserSignup,
    getIdCheck,
    postUserSignin,
    getStamp,
    getReservation,
}
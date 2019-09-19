const { response, errResponse } = require('../library/response')
const returnCode = require('../library/returnCode')

const { sign } = require('../library/jwt');
const userService = require('../service/userService');

async function postUserSignup(req, res) {
    try {
        const user = await userService.postUserSignup(req.body);

        response(res, returnCode.CREATED, '회원가입 성공', { 'authorization': sign(user.insertId) });
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '로그인 에러')
    }
}

module.exports = {
    postUserSignup,
}
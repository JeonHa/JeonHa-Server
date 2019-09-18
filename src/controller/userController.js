const { response, errResponse } = require('../library/response')
const returnCode = require('../library/returnCode')

const userService = require('../service/userService');

async function postUserSignup(req, res) {
    try {
        const user = await userService.postUserSignup(req.body)
    } catch (error) {
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '로그인 에러')

    }
}

module.exports = {
    postUserSignup,
}
const userDao = require('../dao/userDao');

async function postUserSignup(userData) {
    return await userDao.insertUser(userData);
}

async function checkUserId(id) {

}

module.exports = {
    postUserSignup,
    checkUserId,
}
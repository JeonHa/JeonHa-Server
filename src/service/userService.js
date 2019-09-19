const userDao = require('../dao/userDao');

async function postUserSignup(userData) {
    return await userDao.insertUser(userData);
}

async function getIdCheck(id) {
    const user = await userDao.selectUserById(id);

    if (user.length == 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    postUserSignup,
    getIdCheck,
}
const userDao = require('../dao/userDao');

async function postUserSignup(userData) {
    const user = await userDao.selectUserById(userData.id);
    console.log(user);

    if (user.length == 0) {
        return await userDao.insertUser(userData);
    } else {
        return [];
    }
}

async function getIdCheck(id) {
    const user = await userDao.selectUserById(id);

    if (user.length == 0) {
        return false;
    } else {
        return true;
    }
}

async function postUserSignin(userData) {
    const user = await userDao.selectUserById(userData.id);

    if (user.length == 0) {
        return 0;
    } else {
        if (user[0].pw == userData.pw) {
            return user[0].userIdx;
        } else {
            return 0;
        }
    }
}

module.exports = {
    postUserSignup,
    getIdCheck,
    postUserSignin,
}
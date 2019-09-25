const reservationDao = require('../dao/reservationDao');
const hanokDao = require('../dao/hanokDao');
const classDao = require('../dao/classDao');

async function getHanokReservationList(userIdx) {
    const hanokList = await reservationDao.selectHanokReservation(userIdx);

    for (let i = 0; i < hanokList.length; i++) {
        hanokList[i]['thumnail'] = (await hanokDao.selectAllHanokImage(hanokList[i].hanokIdx))[0].img;
    }

    const hanokReservation = {
        'totalCnt': hanokList.length,
        'list': hanokList
    }

    return hanokReservation;
}

async function getClassReservationList(userIdx) {
    const classList = await classDao.selectReservationClass(userIdx);


    for (let i = 0; i < classList.length; i++) {
        classList[i]['thumnail'] = (await classDao.selectClassThumnail(classList[i].classIdx))[0].img;
    }

    const classReservation = {
        'totalCnt': classList.length,
        'list': classList
    }

    return classReservation;

}

async function getStamp(userIdx) {
    return await reservationDao.selectReservationStamp(userIdx);
}

async function postStamp(userIdx, url) {
    const urlType = (await reservationDao.selectUrl(url))[0];
    console.log(urlType)

    const reservationInfo = {
        'userIdx': userIdx
    }
    if (urlType.type == 1) { // 한옥일 때
        reservationInfo['hanokIdx'] = urlType.homeIdx;
        return await reservationDao.updateHanokReservationState(reservationInfo);
    } else { // 클래스일 때
        reservationInfo['classIdx'] = urlType.homeIdx;
        return await reservationDao.updateClassReservationState(reservationInfo);
    }
}

async function getAllReservationSummary(userIdx) {
    const list = {
        'hanokList': [],
        'classList': []
    }

    if (userIdx != null) {
        list.hanokList = (await getHanokReservationList(userIdx)).list;
        list.classList = (await getClassReservationList(userIdx)).list;
    }
    return list;
}

module.exports = {
    getHanokReservationList,
    getStamp,
    postStamp,
    getClassReservationList,
    getAllReservationSummary,
}
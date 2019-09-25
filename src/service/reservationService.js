const reservationDao = require('../dao/reservationDao');
const hanokDao = require('../dao/hanokDao');
const classDao = require('../dao/classDao');

async function getHanokReservationList(userIdx) {
    const hanokIdxs = await reservationDao.selectHanokReservation(userIdx);
    const hanokList = []

    for (let i = 0; i < hanokIdxs.length; i++) {
        let idx = hanokIdxs[i].hanokIdx;

        hanokList[i] = (await hanokDao.selectHanok(idx))[0];
        hanokList[i]['thumnail'] = (await hanokDao.selectAllHanokImage(idx))[0].img;
        delete hanokList[i].detail;
        delete hanokList[i].option;
        delete hanokList[i].transport;
        delete hanokList[i].latitude;
        delete hanokList[i].longitude;
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
        classList['thumnail'] = await classDao.selectClassThumnail(classList[i].classIdx);
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

module.exports = {
    getHanokReservationList,
    getStamp,
    postStamp,
    getClassReservationList,
}
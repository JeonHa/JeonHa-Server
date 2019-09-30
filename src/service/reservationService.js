const reservationDao = require('../dao/reservationDao');
const hanokDao = require('../dao/hanokDao');
const classDao = require('../dao/classDao');
const userDao = require('../dao/userDao');

async function getHanokReservationList(userIdx) {
    const hanokList = await reservationDao.selectHanokReservation(userIdx);

    for (let i = 0; i < hanokList.length; i++) {
        hanokList[i]['thumnail'] = (await hanokDao.selectHanokThumnail(hanokList[i].hanokIdx))[0].img;
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
    const userName = (await userDao.selectUserInfoByIdx(userIdx))[0].name;
    const stampList = await reservationDao.selectReservationStamp(userIdx)
    return { 'userName': userName, 'stampList': stampList }
}

async function postStamp(userIdx, url) {
    const urlType = (await reservationDao.selectUrl(url))[0];

    const reservationInfo = {
        'userIdx': userIdx
    }

    let reservation = null;

    // 매칭된 url이
    if (urlType.type == 1) { // 한옥일 때
        // 해당 한옥에 대한 예약이 있는지 왁인
        reservation = await reservationDao.selectReservationByUserAndHanokIdx(userIdx, urlType.homeIdx);
        console.log(reservation);

        if (reservation.length == 0) {
            return 400;
        } else if (reservation[0].checktime == null) { // 해당 한옥에 대한 예약이 있고 확인 전
            reservationInfo['hanokIdx'] = urlType.homeIdx;
            return await reservationDao.updateHanokReservationState(reservationInfo);
        } else if (reservation[0].checktime != null) { // 해당 한옥에 대한 예약이 있고 이미 확인 되었음
            return 304;
        } else { // 해당 한옥에 대한 예약이 없음
            return 400;
        }
    } else { // 클래스일 때
        reservation = await reservationDao.selectReservationByUserAndClassIdx(userIdx, urlType.homeIdx);

        if (reservation.length == 0) {
            return 400;
        } else if (reservation[0].checktime == null) {
            reservationInfo['classIdx'] = urlType.homeIdx;
            return await reservationDao.updateClassReservationState(reservationInfo);
        } else if (reservation[0].checktime != null) {
            return 304;
        } else {
            return 400;
        }
    }
}

async function getRecommendHanokAndClass() {
    const list = {
        'hanokList': [],
        'classList': []
    }

    list.hanokList = await hanokDao.selectHanokRecommend();
    list.classList = await classDao.selectClassRecommend();

    for (let i = 0; i < 5; i++) {
        list.hanokList[i]['thumnail'] = (await hanokDao.selectHanokThumnail(list.hanokList[i].hanokIdx))[0].img;
        list.classList[i]['thumnail'] = (await classDao.selectClassThumnail(list.classList[i].classIdx))[0].img;
    }

    return list;
}

module.exports = {
    getHanokReservationList,
    getStamp,
    postStamp,
    getClassReservationList,
    getRecommendHanokAndClass,
}
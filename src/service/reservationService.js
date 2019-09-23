const reservationDao = require('../dao/reservationDao');
const hanokDao = require('../dao/hanokDao');

async function getHanokReservationList(userIdx) {
    const hanokIdxs = await reservationDao.selectHanokReservation(userIdx);
    console.log(hanokIdxs)
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

    return hanokList;
}

// async function getClassReservationList(userIdx) {

// }

async function getStamp(userIdx) {
    return await reservationDao.selectReservationStamp(userIdx);
}

module.exports = {
    getHanokReservationList,
    getStamp,
}
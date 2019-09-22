const hanokDao = require('../dao/hanokDao');

async function getHanokMap() {
    const allHanok = await hanokDao.selectAllHanok();
    console.log(allHanok);
    return allHanok;
}

async function getHanokList(sortType) {
    let allHanok;
    if (sortType == undefined) {
        allHanok = await hanokDao.selectAllHanokList();
    } else {
        allHanok = await hanokDao.selectAllHanokList(); //sortType으로 바꿔줘야 함
    }
    const allHanokImage = await hanokDao.selectAllHanokImage();
    let hanokData = [];
    await allHanok.map(data => {
        let hanokList = data;
        for (let i = 0; i < allHanokImage.length; i++) {
            if (data.hanokIdx == allHanokImage[i].hanokIdx) {
                hanokList.img = allHanokImage[i].img;
                break;
            }
        }
        hanokData.push(hanokList);
    })
    return hanokData;
}

async function getHanokDetail(hanokIdx) {
    const hanokDetail = await hanokDao.selectHanok(hanokIdx);
    const hanokImage = await hanokDao.selectHanokImage(hanokIdx);
    let hanokInverted = {
        hanokIdx: hanokDetail[0].hanokIdx,
        name: hanokDetail[0].name,
        place: hanokDetail[0].place,
        address: hanokDetail[0].address,
        detail: hanokDetail[0].detail,
        option: hanokDetail[0].option,
        transport: hanokDetail[0].transport,
        img: hanokImage
    };
    console.log(hanokInverted);
    return hanokInverted;

}

async function postHanokReservation(hanokIdx, userIdx) {
    let hanokJson = {
        userIdx: Number(userIdx),
        hanokIdx: Number(hanokIdx),
        state: true
    }
    const checkExistReserve = await hanokDao.selectHanokReservation(hanokJson);
    if (checkExistReserve[0]) {
        return false;
    } else {
        await hanokDao.postHanokReservation(hanokJson);
        return true;
    }
}


module.exports = {
    getHanokMap,
    getHanokList,
    getHanokDetail,
    postHanokReservation
}
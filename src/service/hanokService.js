const hanokDao = require('../dao/hanokDao');

async function getHanokMap() {
    const allHanok = await hanokDao.selectAllHanok();
    console.log(allHanok);
    return allHanok;
}

async function getHanokList(sortType) {
    const sortList = ['', '마포구', '시청일대', '동대문주변', '강남', '신촌 · 홍대 일대', '고궁일대', '용산 · 여의도', 
    '잠실', '그 외 지역', '외국인관광 도시민박업', '한옥체험업'];
    let allHanok;
    if (sortList[Number(sortType)] == '' || sortList[Number(sortType)] == undefined) {
        allHanok = await hanokDao.selectAllHanokList();
    } else {
        if(sortType < 10) {
            allHanok = await hanokDao.selectPlaceSortedHanokList(sortList[Number(sortType)]);
        } else {
            allHanok = await hanokDao.selectTypeSortedHanokList(sortList[Number(sortType)]);
        }
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
    const hanokRoom = await hanokDao.selectHanokRoom(hanokIdx);
    let hanokInverted = {
        hanokIdx: hanokDetail[0].hanokIdx,
        name: hanokDetail[0].name,
        place: hanokDetail[0].place,
        address: hanokDetail[0].address,
        detail: hanokDetail[0].detail,
        option: hanokDetail[0].option,
        transport: hanokDetail[0].transport,
        img: hanokImage,
        rooms : hanokRoom
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

//테스트용 예약 삭제
async function hanokReservationDelete(userIdx, hanokIdx) {
    let hanokJson = {
        userIdx: Number(userIdx),
        hanokIdx: Number(hanokIdx)
    }
    await hanokDao.hanokReservationDelete(hanokJson);
}


module.exports = {
    getHanokMap,
    getHanokList,
    getHanokDetail,
    postHanokReservation,
    hanokReservationDelete
}
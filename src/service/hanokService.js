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
            allHanok = [];
            let sortAddress;
            if(sortType == 1){
                sortAddress = ['마포구'];
            } else if(sortType == 2){
                sortAddress = ['시청주변', '명동 · 을지로','남대문시장·남산'];  
            } else if(sortType == 3){
                sortAddress = ['동대문 시장', '대학로'];
            } else if(sortType == 4){
                sortAddress = ['압구정동·청담동', '신사동 가로수길 주변', '강남역 주변', '삼성역 주변', '서초'];
            } else if(sortType == 5) {
                sortAddress = ['신촌·이대역 주변', '홍대·상수역 주변'];
            } else if(sortType == 6) {
                sortAddress = ['광화문', '청계천·종로', '인사동', '삼청동·북촌'];
            } else if(sortType == 7){
                sortAddress = ['이태원', '여의도'];
            } else if(sortType == 8) {
                sortAddress = ['잠실', '송파'];
            } else if(sortType == 9) {
                sortAddress = ['뚝섬·건대입구역 주변', '김포공항 주변', '사당·동작역 주변', '그 외 지역'];
            }

            sortAddress.map(async type => {
                const tempHanok = await hanokDao.selectPlaceSortedHanokList(type)
                allHanok = allHanok.concat(tempHanok);
            })
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
        type : hanokDetail[0].type,
        place: hanokDetail[0].place,
        latitude : hanokDetail[0].latitude,
        longitude : hanokDetail[0].longitude,
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
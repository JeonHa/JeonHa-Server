const classDao = require('../dao/classDao');

async function getClassList() {

    const allClass = await classDao.selectClass();
    const classImg = await classDao.selectClassImg();

    let classList = [];

    await allClass.map(data => {
        let classData = data;
        for(let i = 0; i<classImg.length;i++){
            if (data.classIdx == classImg[i].classIdx) {
                classData.img = classImg[i].img;
                break;
            }
        }
        classList.push(classData);
    })

    return classList;
}

async function getClassDetail(classIdx) {
    const classDetail = await classDao.selectClassByIdx(classIdx);
    const classImg = await classDao.selectClassImgByIdx(classIdx);

    let classInverted = {
        classIdx: classDetail[0].classIdx,
        name: classDetail[0].name,
        place: classDetail[0].place,
        address: classDetail[0].address,
        detail: classDetail[0].detail,
        option: classDetail[0].option,
        transport: classDetail[0].transport,
        img: classImg
    };

    return classInverted;
}

async function postClassReservation(classIdx, userIdx) {

    const reservationInfo = {
        userIdx: Number(userIdx),
        classIdx: Number(classIdx),
    }

    const classReservation = await classDao.selectClassReservationByIdx(reservationInfo);

    if (classReservation[0]) {
        return false;
    } else {
        await classDao.insertClassReservation(reservationInfo);
        return true;
    }
}

module.exports = {
    getClassList,
    getClassDetail,
    postClassReservation
}
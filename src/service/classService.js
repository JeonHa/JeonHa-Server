const classDao = require('../dao/classDao');

async function getClassList(day) {

    let allClass

    const dayList = ['', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

    if (dayList[Number(day)] == '' || dayList[Number(day)] == undefined) {
        allClass = await classDao.selectAllClass();
    } else {
        allClass = await classDao.selectClassByWeekday(dayList[Number(day)]);
    }

    //요일 묶어주기
    let listSize = allClass.length;

    for(let i = 0, j=0; i<listSize-j; ){
        if(allClass[i+1] == undefined){
            break;
        } else if(allClass[i].classIdx == allClass[i+1].classIdx){

            let weekdayArray = allClass[i].weekday.split(' ');
            
            if(weekdayArray[weekdayArray.length-1]!=allClass[i+1].weekday){
                allClass[i].weekday = allClass[i].weekday + " " + allClass[i+1].weekday;
            }

            allClass = allClass.slice(0,i+1).concat(allClass.slice(i+2));

            j++
        } else {
            i++;
        }
    }

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
    const classSchedule = await classDao.selectWeekdayByClassIdx(classIdx);

    let classInverted = {
        classIdx: classDetail[0].classIdx,
        name: classDetail[0].name,
        place: classDetail[0].place,
        address: classDetail[0].address,
        detail: classDetail[0].detail,
        option: classDetail[0].option,
        transport: classDetail[0].transport,
        img: classImg,
        schedule: classSchedule
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
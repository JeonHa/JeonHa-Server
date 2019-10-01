const mysql = require('../library/mysql');

async function selectClassByIdx(classIdx) {
    const selectSql = `SELECT * FROM class WHERE classIdx = ?`;

    return await mysql.query(selectSql, [Number(classIdx)]);
}

async function selectClassImg() {
    const selectSql = `SELECT * FROM class_img`;

    return await mysql.query(selectSql);
}

async function selectClassImgByIdx(classIdx) {
    const selectSql = `SELECT * FROM class_img WHERE classIdx = ?`;

    return await mysql.query(selectSql, [Number(classIdx)]);
}

async function selectClassReservationByIdx(reservationInfo) {
    const selectSql = `SELECT * FROM class_reservation WHERE weekIdx = ? AND userIdx = ?;`;

    return await mysql.query(selectSql, [reservationInfo.weekIdx, reservationInfo.userIdx])
}

async function insertClassReservation(reservationInfo) {
    const insertSql = `INSERT INTO class_reservation (weekIdx, userIdx, state, writetime) 
    VALUES (?, ?, 0, NOW());`;

    return await mysql.query(insertSql, [reservationInfo.weekIdx, reservationInfo.userIdx])
}

async function selectReservationClass(userIdx) {
    const selectSql = `SELECT c.classIdx, name, weekday, time, writetime
    FROM class AS c
    JOIN (
        SELECT cr.crIdx, weekday, time, classIdx, writetime
        FROM class_reservation AS cr
        JOIN class_weekday AS cw
        ON cr.weekIdx = cw.weekIdx
        WHERE cr.userIdx = ?) AS cr
    ON cr.classIdx = c.classIdx
    ORDER BY writetime DESC`;

    return await mysql.query(selectSql, [userIdx]);
}

async function selectClassThumnail(classIdx) {
    const selectSql = `SELECT img
    FROM class_img
    WHERE classIdx = ?
    ORDER BY ciIdx
    LIMIT 1`;

    return await mysql.query(selectSql, [classIdx]);
}

async function selectAllClass() {
    const selectSql = `SELECT c.classIdx, name, weekday, time, weekIdx
    FROM class AS c
    JOIN class_weekday AS cw
    ON c.classIdx = cw.classIdx
    ORDER BY c.classIdx, weekIdx`;

    return await mysql.query(selectSql);
}

async function selectClassByWeekday(weekday) {
    const selectSql = `SELECT c.classIdx, name, weekday, time, weekIdx
    FROM class AS c
    JOIN class_weekday AS cw
    ON c.classIdx = cw.classIdx
    JOIN (SELECT classIdx
        FROM class_weekday
        WHERE weekday = ?) AS cw_detail
    ON cw_detail.classIdx = c.classIdx
    ORDER BY c.classIdx, weekIdx`;

    return await mysql.query(selectSql, [weekday])
}

async function selectWeekdayByClassIdx(classIdx) {
    const selectSql = `SELECT * FROM class_weekday
    WHERE classIdx = ?
    ORDER BY weekIdx`;

    return await mysql.query(selectSql, [classIdx])
}

async function selectClassRecommend() {
    const selectSql = `SELECT classIdx, name
    FROM class AS c
    JOIN recommend AS r
    ON classIdx = r.homeIdx AND r.type = 2`;

    return await mysql.query(selectSql);
}

module.exports = {
    selectClassByIdx,
    selectClassImg,
    selectClassImgByIdx,
    selectClassReservationByIdx,
    insertClassReservation,
    selectReservationClass,
    selectClassThumnail,
    selectAllClass,
    selectClassByWeekday,
    selectWeekdayByClassIdx,
    selectClassRecommend,
}
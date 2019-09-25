const mysql = require('../library/mysql');


async function selectClass() {
    const selectSql = `SELECT * FROM class`;

    return await mysql.query(selectSql);
}

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
    const selectSql = `SELECT * FROM class_reservation WHERE classIdx = ? AND userIdx = ?;`;

    return await mysql.query(selectSql, [reservationInfo.classIdx, reservationInfo.userIdx])
}

async function insertClassReservation(reservationInfo) {
    const insertSql = `INSERT INTO class_reservation (classIdx, userIdx, state) 
    VALUES (?, ?, 0);`;

    return await mysql.query(insertSql, [reservationInfo.classIdx, reservationInfo.userIdx])
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

module.exports = {
    selectClass,
    selectClassByIdx,
    selectClassImg,
    selectClassImgByIdx,
    selectClassReservationByIdx,
    insertClassReservation,
    selectReservationClass,
    selectClassThumnail,
}
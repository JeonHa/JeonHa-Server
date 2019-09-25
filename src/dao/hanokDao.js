const mysql = require('../library/mysql');

async function selectAllHanok() {
    const selectSql = `SELECT hanokIdx, name, latitude, longitude, type, place FROM hanok`;
    return await mysql.query(selectSql);
}

async function selectAllHanokList() {
    const selectSql = `SELECT hanokIdx, name, type, place, address FROM hanok`;
    return await mysql.query(selectSql);
}

async function selectPlaceSortedHanokList(hanokPlace) {
    const selectSql = `SELECT hanokIdx, name, type, place, address FROM hanok WHERE place = ?`;
    return await mysql.query(selectSql, [hanokPlace]);
}

async function selectTypeSortedHanokList(hanokType) {
    const selectSql = `SELECT hanokIdx, name, type, place, address FROM hanok WHERE type = ?`;
    return await mysql.query(selectSql, [hanokType]);
}

async function selectAllHanokImage() {
    const selectSql = `SELECT * FROM hanok_img`;
    return await mysql.query(selectSql);
}

async function selectHanok(hanokIdx) {
    const selectSql = `SELECT * FROM hanok WHERE hanokIdx = ?`
    return await mysql.query(selectSql, [Number(hanokIdx)]);
}

async function selectHanokImage(hanokIdx) {
    const selectSql = `SELECT img FROM hanok_img WHERE hanokIdx = ?`
    return await mysql.query(selectSql, [Number(hanokIdx)]);
}

async function selectHanokRoom(hanokIdx) {
    const selectSql = `SELECT type, persons, rooms FROM room_info WHERE hanokIdx = ?`;
    return await mysql.query(selectSql, [hanokIdx]);
}

async function postHanokReservation(reserveJson) {
    const postSql = `INSERT INTO hanok_reservation(userIdx, hanokIdx, state) VALUES (?, ?, ?)`

    return await mysql.query(postSql, [reserveJson.userIdx, reserveJson.hanokIdx, reserveJson.state]);
}

async function selectHanokReservation(reserveJson) {
    const selectSql = `SELECT * FROM hanok_reservation WHERE userIdx = ? AND hanokIdx = ?`
    return await mysql.query(selectSql, [reserveJson.userIdx, reserveJson.hanokIdx]);
}
 
//테스트용 예약 삭제
async function hanokReservationDelete(reserveJson) {
    const deleteSql = `DELETE FROM hanok_reservation WHERE userIdx = ? AND hanokIdx = ?`;
    return await mysql.query(deleteSql, [reserveJson.userIdx, reserveJson.hanokIdx]);
}

async function selectHanokUrl(url) {
    const selectSql = `SELECT hanokIdx
    FROM hanok
    WHERE url = ?`;

    return await mysql.query(selectSql, [url]);
}

module.exports = {
    selectAllHanok,
    selectAllHanokList,
    selectPlaceSortedHanokList,
    selectTypeSortedHanokList,
    selectAllHanokImage,
    selectHanok,
    selectHanokImage,
    selectHanokRoom,
    postHanokReservation,
    selectHanokReservation,
    hanokReservationDelete,
    selectHanokUrl,
}
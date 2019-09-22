const mysql = require('../library/mysql');

async function selectAllHanok() {
    const selectSql = `SELECT hanokIdx, name, latitude, longitude, place FROM hanok`;
    return await mysql.query(selectSql);
}

async function selectAllHanokList() {
    const selectSql = `SELECT hanokIdx, name, place, address FROM hanok`;
    return await mysql.query(selectSql);
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

module.exports = {
    selectAllHanok,
    selectAllHanokList,
    selectAllHanokImage,
    selectHanok,
    selectHanokImage,
    postHanokReservation,
    selectHanokReservation,
    hanokReservationDelete
}
const mysql = require('../library/mysql');

async function selectHanokReservation(userIdx) {
    const selectSql = `SELECT hanokIdx, writetime 
    FROM hanok_reservation
    WHERE userIdx = ?
    ORDER BY writetime DESC`;

    return await mysql.query(selectSql, [userIdx])
}

async function selectClassReservation(userIdx) {
    const selectSql = `SELECT classIdx, writetime 
    FROM class_reservation
    WHERE userIdx = ?
    ORDER BY writetime DESC`;

    return await mysql.query(selectSql, [userIdx])
}

async function updateHanokReservationState(reservationInfo) {
    const updateSql = `UPDATE hanok_reservation
    SET state = 1
    WHERE userIdx = ?, hanokIdx = ?`;

    return await mysql.query(updateSql, [reservationInfo.userIdx, reservationInfo.hanokIdx]);
}

async function updateClassReservationState(reservationInfo) {
    const updateSql = `UPDATE class_reservation
    SET state = 1
    WHERE userIdx = ?, classIdx = ?`;

    return await mysql.query(updateSql, [reservationInfo.userIdx, reservationInfo.classIdx]);
}

async function selectReservationStamp(userIdx) {
    const selectSql = `SELECT hanokIdx AS idx, writetime, img
    FROM hanok_reservation
    JOIN stamp_img AS si
    ON si.siIdx = 1
    WHERE userIdx = 1 AND state = 0
    UNION 
    SELECT classIdx AS idx, writetime, img
    FROM class_reservation 
    JOIN stamp_img AS si
    ON si.siIdx = 2
    WHERE userIdx = ? AND state = 0
    ORDER BY writetime DESC;`;

    return await mysql.query(selectSql, [userIdx]);
}

module.exports = {
    selectHanokReservation,
    selectClassReservation,
    updateHanokReservationState,
    updateClassReservationState,
    selectReservationStamp,
}
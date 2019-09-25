const mysql = require('../library/mysql');

async function selectHanokReservation(userIdx) {
    const selectSql = `SELECT h.hanokIdx, name, type, place, address, writetime
    FROM hanok AS h
    JOIN hanok_reservation AS hr
    ON h.hanokIdx = hr.hanokIdx AND hr.userIdx = ?
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
    SET state = 1, checktime = NOW()
    WHERE userIdx = ? AND hanokIdx = ?`;

    return await mysql.query(updateSql, [reservationInfo.userIdx, reservationInfo.hanokIdx]);
}

async function updateClassReservationState(reservationInfo) {
    const updateSql = `UPDATE class_reservation
    SET state = 1, checktime = NOW()
    WHERE userIdx = ? AND classIdx = ?`;

    return await mysql.query(updateSql, [reservationInfo.userIdx, reservationInfo.classIdx]);
}

async function selectReservationStamp(userIdx) {
    const selectSql = `SELECT hanokIdx AS idx, writetime, img
    FROM hanok_reservation
    JOIN stamp_img AS si
    ON si.siIdx = 1
    WHERE userIdx = 1 AND state = 1
    UNION 
    SELECT classIdx AS idx, writetime, img
    FROM class_reservation 
    JOIN stamp_img AS si
    ON si.siIdx = 2
    WHERE userIdx = ? AND state = 1
    ORDER BY writetime DESC;`;

    return await mysql.query(selectSql, [userIdx]);
}

async function selectUrl(url) {
    const selectSql = `SELECT *
    FROM url
    WHERE url = ?`;

    return await mysql.query(selectSql, [url]);
}



module.exports = {
    selectHanokReservation,
    selectClassReservation,
    updateHanokReservationState,
    updateClassReservationState,
    selectReservationStamp,
    selectUrl,
}
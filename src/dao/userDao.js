const mysql = require('../library/mysql');

async function insertUser(userData) {
    const insertSql = `INSERT INTO user (name, pw, id, phone) 
    VALUES (?, ?, ?, ?);`;

    return await mysql.query(insertSql, [userData.name, userData.pw, userData.id, userData.phone])
}

async function selectUserById(id) {
    const selectSql = `SELECT *
    FROM user
    WHERE id = ?`;

    return await mysql.query(selectSql, [id])
}

async function selectUserInfoByIdx(idx) {
    const selectSql = `SELECT *
    FROM user
    WHERE userIdx = ?`;

    return await mysql.query(selectSql, [idx]);
}

module.exports = {
    insertUser,
    selectUserById,
    selectUserInfoByIdx,
}
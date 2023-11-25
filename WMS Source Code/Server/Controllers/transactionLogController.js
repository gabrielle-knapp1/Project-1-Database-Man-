const mysql = require('../mysql');

async function GetUserTransactionLogs(req, res) {
    const rows = await mysql.selectQuery("select transactionID, checkoutTime, expectedDeliveryTime, borrowReturnTime, borrowState, totalCost from vTransactionLog where username=?", [req.session.username]);
    res.send({ success: true, logs: rows })
}

async function GetAllTransactionLogs(req, res) {
    const rows = await mysql.selectQuery("select transactionID, username, checkoutTime, expectedDeliveryTime, borrowReturnTime, borrowState, totalCost from vTransactionLog", []);
    res.send({ success: true, logs: rows })
}

module.exports = {
    GetUserTransactionLogs,
    GetAllTransactionLogs
};
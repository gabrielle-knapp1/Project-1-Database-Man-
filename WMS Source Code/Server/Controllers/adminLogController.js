const mysql = require('../mysql');

async function GetAdminLogs(req, res) {
    const rows = await mysql.selectQuery("select logID, adminUsername, description, timeStamp from vAdminLog", []);
    res.send({ success: true, logs: rows })
}

function UpdateAdminLog(req, res) {
    mysql.insertQuery("update vAdminLog set description=?, timeStamp=NOW() where logID=?", [req.body.description, req.body.logID]);
    res.send({success: true});
}

module.exports = {
    GetAdminLogs,
    UpdateAdminLog
};
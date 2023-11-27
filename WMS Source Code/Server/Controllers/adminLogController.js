const mysql = require('../mysql');

async function GetAdminLogs(req, res) {
    const rows = await mysql.selectQuery("select logID, adminUsername, description, timeStamp from vAdminLog", []);
    res.send({ success: true, logs: rows })
}

function UpdateAdminLog(req, res) {
    mysql.insertQuery("update vAdminLog set adminUsername=?, description=?, timeStamp=now() where logID=?", [req.session.username, req.body.description, req.body.logID]);
    mysql.insertQuery("update vTransactionLog set expectedDeliveryTime=now()+interval 3 day, borrowReturnTime=now()+interval 33 day, borrowState=? where transactionID=(select transactionId from vAdminLog where logID=?)", [req.body.accepted? 'accepted' : 'rejected', req.body.logID]);
    res.send({success: true});
}

module.exports = {
    GetAdminLogs,
    UpdateAdminLog
};
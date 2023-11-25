const mysql = require('../mysql');

async function GetMyCart(req, res) {
    const rows = await mysql.selectQuery("select itemID, quantity, borrowing, checkedOut from vCarts where username=? and checkOutTime=?", [req.session.username, req.body.checkOutTime]);
}

async function GetUserCart(req, res) {
    const rows = await mysql.selectQuery("select itemID, quantity, borrowing, checkedOut from vCarts where username=? and checkOutTime=?", [req.body.username, req.body.checkOutTime]);
    res.send({ success: true, rows: rows });
}

module.exports = {
    GetUserCart
};
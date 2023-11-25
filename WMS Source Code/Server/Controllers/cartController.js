const mysql = require('../mysql');

async function GetUserCart(req, res) {
    //this should be more informative
    //it should also get the name of the item with that itemID
    const cart = await mysql.selectQuery("select vCarts.itemID, name, quantity, borrowing, checkedOut, if(borrowing=1, 0, pricePerUnit) as pricePerUnit, if(borrowing=1, 0, pricePerUnit * quantity) as totalPrice from vCarts join vItems on vCarts.itemID=vItems.itemID where username=? and checkOutTime=?", [req.body.username, req.body.checkOutTime]);
    res.send({ success: true, rows: cart });
}

async function GetMyCart(req, res) {
    //this should be more informative
    //it should also get the name of the item with that itemID
    const cart = await mysql.selectQuery("select vCarts.itemID, name, quantity, borrowing, if(borrowing=1, 0, pricePerUnit) as pricePerUnit, if(borrowing=1, 0, pricePerUnit * quantity) as totalPrice from vCarts join vItems on vCarts.itemID=vItems.itemID where username=? and checkedOut=false", [req.session.username]);
    res.send({ success: true, rows: cart });
}

module.exports = {
    GetUserCart,
    GetMyCart
};
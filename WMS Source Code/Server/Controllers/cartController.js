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

async function Purchase(req, res) {
    const cartRows = await mysql.selectQuery("select vCarts.itemID, name, quantity, borrowing, if(borrowing=1, 0, pricePerUnit * quantity) as totalPrice from vCarts join vItems on vCarts.itemID=vItems.itemID where username=? and checkedOut=false", [req.session.username]);
    const nextTransactionLogID = await mysql.selectQuery("select max(transactionID)+1 from vTransactionLog", []);
    let response = {
        success: true,
        message: "Purchase Successful"
    }

    //if requesting to borrow an item
    let borrowing = false;
    let totalCost = 0.0;
    cartRows.forEach(async item => {
        if (item.borrowing) {
            borrowing = true;
            //insert new admin log entry
            mysql.insertQuery("insert into vAdminLog(logID, description, timeStamp, transactionID) values ((select max(logID)+1 from vAdminLog), ?, now(), ?)", [`${req.session.username} Requested to Borrow Item: ${item.name}`, nextTransactionLogID]);
        } else {
            totalCost += item.totalPrice;
            //update or items depending on the stockQuantity and quantity bought
            let stockQuantity = await mysql.selectQuery("select stockQuantity from vItems where itemID=?", [item.itemID]);
            if (stockQuantity < item.quantity) {
                mysql.insertQuery("update vCarts set quantity=? where username=? and checkedOut=false and itemID=?", [stockQuantity, req.session.username, item.itemID]);
                item.quantity = stockQuantity;
                message = "There were not enough of some items in stock, please check your transaction log to see the quantity of items purchased.";
            }
            mysql.insertQuery("update vItems set stockQuantity=? where itemID=?", [stockQuantity - item.quantity, item.itemID]);
        }
    });

    //update the cart checkedOut status
    mysql.insertQuery("update vCarts set checkedOut=true, checkOutTime=NOW() where username=? and checkedOut=false", [req.session.username]);

    //insert into the transactionLog
    if (borrowing) mysql.insertQuery("insert into vTransactionLog(transactionID, username, checkoutTime, borrowState, totalCost, creditCardNum) values (?, ?, now(), 'pending', ?, ?)", [nextTransactionLogID, req.session.username, totalCost, req.body.creditCardNumber]);
    else mysql.insertQuery("insert into vTransactionLog(transactionID, username, checkoutTime, expectedDeliveryTime, totalCost, creditCardNum) values (?, ?, now(), now()+interval 3 day, ?, ?)", [nextTransactionLogID, req.session.username, totalCost, req.body.creditCardNumber]);

    res.send(response);
}

function AddToCart(req, res) {
    //get the item in the req.body and insert it into this user's cart
}

function DeleteFromCart(req, res) {
    mysql.insertQuery("delete from vCarts where username=? and checkedOut=false and itemID=?", [req.session.username, req.body.itemID]);
    res.send({success: true});
}

function ChangeQuantity(req, res) {
    mysql.insertQuery("update vCarts set quantity=? where username=? and checkedOut=false and itemID=?", [req.body.newQuantity, req.session.username, req.body.itemID]);
    res.send({success: true});
}

module.exports = {
    GetUserCart,
    GetMyCart,
    Purchase,
    AddToCart,
    DeleteFromCart,
    ChangeQuantity
};
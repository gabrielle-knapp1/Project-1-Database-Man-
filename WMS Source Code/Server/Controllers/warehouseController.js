const mysql = require('../mysql');

async function GetFavorites(req, res) {
    //select all items from the favorites table where the username matches the session username
    const rows = await mysql.selectQuery("select favoriteID, username, itemID from vFavorites", []);
    res.send({ success: true, items: rows })
}

function AddFavorite(req, res) {
    //use the item in the req.body and insert it into this user's favorites
}

function RemoveFavorite(req, res) {
    //use the item in the req.body and delete it from this user's favorites
    mysql.insertQuery("delete from vFavorites where username=? and favoriteID=?", [req.session.username, req.body.favoriteID]);
    res.send({success: true});
}

async function GetWarehouse(req, res) {
    //select all the items from the warehouse table
    const rows = await mysql.selectQuery("select itemID, type, name, providerID, stockQuantity, placeID, pricePerUnit from vItems", []);
    res.send({ success: true, items: rows });
}

function AddItem(req, res) {}

function EditItem(req, res) {
    const column = req.body.category;
    mysql.insertQuery("UPDATE vItems SET ${column} = ? WHERE itemID = ?", [req.body.info, req.body.itemID]);
    mysql.insertQuery("update vTransactionLog set expectedDeliveryTime=now()+interval 3 day, borrowReturnTime=now()+interval 33 day, borrowState=? where transactionID=(select transactionId from vAdminLog where logID=?)", [req.body.accepted? 'accepted' : 'rejected', req.body.logID]);
    res.send({success: true});
}

function RemoveItem(req, res) {
    //use the item in the req.body and delete it from the admin warehouse
    mysql.insertQuery("delete from vItems where itemID=?", [req.session.itemID]);
    res.send({success: true});
}

module.exports = {
    GetFavorites,
    AddFavorite,
    RemoveFavorite,
    GetWarehouse,
    AddItem,
    EditItem,
    RemoveItem
};

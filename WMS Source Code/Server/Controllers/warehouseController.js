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

function EditItem(req, res) {}

function RemoveItem(req, res) {}

module.exports = {
    GetFavorites,
    AddFavorite,
    RemoveFavorite,
    GetWarehouse,
    AddItem,
    EditItem,
    RemoveItem
};

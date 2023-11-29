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
    try {
        const {newItemID, originalItemID, type, name, providerID, stockQuantity, placeID, pricePerUnit} = req.body;
        let sql = "update vItems set ";
        let values = [];
        let changed = false;
        if (newItemID !== '') {
            sql += "itemID=?, ";
            values.push(newItemID);
            changed = true;
        }
        if (type !== '') {
            sql += "type=?, ";
            values.push(type);
            changed = true;
        }
        if (name !== '') {
            sql += "name=?, ";
            values.push(name);
            changed = true;
        }
        if (providerID !== '') {
            sql += "providerID=?, ";
            values.push(providerID);
            changed = true;
        }
        if (stockQuantity !== '') {
            sql += "stockQuantity=?, ";
            values.push(stockQuantity);
            changed = true;
        }
        if (placeID !== '') {
            sql += "placeID=?, ";
            values.push(placeID);
            changed = true;
        }
         if (pricePerUnit !== '') {
            sql += "pricePerUnit=?, ";
            values.push(pricePerUnit);
            changed = true;
        }
        if (!changed)
            return res.send({ success: false, message: "You must change at least one field." });
        sql = sql.slice(0, -2);
        sql += " where itemID=?";
        mysql.insertQuery(sql, values);
        values.push(originalItemID);
        res.send({ success: true, message: "Item updated" });
    } catch {
        res.send({ success: false, message: "Unkown error" });
    }
}

function RemoveItem(req, res) {
    //use the item in the req.body and delete it from the admin warehouse
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

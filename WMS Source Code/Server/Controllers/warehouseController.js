const mysql = require('../mysql');

async function GetFavorites(req, res) {
    const rows = await mysql.selectQuery("select favoriteID, username, itemID from vFavorites where username = ?", [req.session.username]);
    res.send({ success: true, items: rows })
}

async function AddFavorite(req, res) {
    mysql.insertQuery("insert into vFavorites(username, itemID) values (?, ?)", [req.session.username, req.body.id]);
    res.send({success: true});
}

function RemoveFavorite(req, res) {
    mysql.insertQuery("delete from vFavorites where username=? and favoriteID=?", [req.session.username, req.body.favoriteID]);
    res.send({success: true});
}

async function GetWarehouse(req, res) {
    const rows = await mysql.selectQuery("select itemID, type, name, providerID, stockQuantity, placeID, pricePerUnit from vItems", []);
    res.send({ success: true, items: rows });
}

function AddItem(req, res) {
    mysql.insertQuery("insert into vItems(name, stockQuantity, pricePerUnit) values (?, ?, ?)", [req.body.name, req.body.stockQuantity, req.body.pricePerUnit]);
    res.send({success: true});
}

function EditItem(req, res) {
    try {
        const { itemID, name, stockQuantity, pricePerUnit } = req.body;
        let sql = "update vItems set ";
        let values = [];

        if (name !== '') {
            sql += "name=?, ";
            values.push(name);
        }

        if (stockQuantity !== '') {
            // Parse stockQuantity as an integer
            sql += "stockQuantity=?, ";
            values.push(parseInt(stockQuantity, 10));
        }

        if (pricePerUnit !== '') {
            // Parse pricePerUnit as a float
            sql += "pricePerUnit=?, ";
            values.push(parseFloat(pricePerUnit));
        }

        if (values.length === 0)
            return res.send({ success: false, message: "You must change at least one field." });

        sql = sql.slice(0, -2);
        sql += " where itemID=?";
        // Parse itemID as an integer
        values.push(parseInt(itemID, 10));

        mysql.insertQuery(sql, values);
        res.send({ success: true, message: "Item updated" });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Unknown error" });
    }
}

function RemoveItem(req, res) {
    //use the item in the req.body and delete it from the admin warehouse

    /*WARNING!!!
    
    I think it would be a bad idea to delete the item from the table for multiple reasons.
    If the items table is on delete restrict, it just won't let us delete the item if it's being referenced somewhere else.
    We could change it to on delete cascade, but that would delete all the references to that item, which means it would delete transaction logs and stuff.

    I think the best thing to do would be to simply set the stockQuantity to 0.
    Then when you display the items in the warehouse, just don't display the ones that are out of stock, or give an out of stock warning for those.
    */
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

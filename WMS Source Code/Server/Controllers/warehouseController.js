const mysql = require('../mysql');

function GetFavorites(req, res) {
    //select all items from the favorites table where the username matches the session username
}

function AddFavorite(req, res) {
    //use the item in the req.body and insert it into this user's favorites
}

function RemoveFavorite(req, res) {
    //use the item in the req.body and delete it from this user's favorites
}

function GetWarehouse(req, res) {
    //select all the items from the warehouse table
}

module.exports = {
    GetFavorites,
    AddFavorite,
    RemoveFavorite,
    GetWarehouse
};
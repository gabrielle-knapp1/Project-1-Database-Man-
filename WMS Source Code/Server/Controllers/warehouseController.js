const mysql = require('../mysql');

function GetFavorites(req, res) {
    //select from the favorites table where the username matches the session username
}

function GetWarehouse(req, res) {
    //select all the items from the warehouse table
}

module.exports = {
    GetFavorites,
    GetWarehouse
};
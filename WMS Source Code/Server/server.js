const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const uuid = require('uuid');
const app = express();
app.use(express.static('WMS Source Code/Client/Public'));
const source = './WMS Source Code/Client/views';
const port = 8080;
app.use(cookieParser());

//session
app.use(session({
    genid: (req) => {
        return uuid.v4();
    },
    secret: "34VNJJjfhs7tYD7wwfsG49oae",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // session timeout: 30 minutes
        httpOnly: true,
        sameSite: 'strict',
    }
}));

//JSON Parser
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Client permissions
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//users must login before going to a page directly
function requireLogin(req, res, next) {
    if (req.session && req.session.username) {
        return next();
    } else {
        return res.redirect('/');
    }
}

//views
//both
app.get('/', function (req, res) {res.sendFile('index.html', {root: source})});
app.get('/account', requireLogin, function (req, res) {res.sendFile('account.html', {root: source})});
//regular users
app.get('/home', requireLogin, function (req, res) {res.sendFile('home.html', {root: source})});
app.get('/cart', requireLogin, function (req, res) {res.sendFile('cart.html', {root: source})});
app.get('/favorites', requireLogin, function (req, res) {res.sendFile('favorites.html', {root: source})});
app.get('/transactionLog', requireLogin, function (req, res) {res.sendFile('transactionLog.html', {root: source})});
app.get('/warehouse', requireLogin, function (req, res) {res.sendFile('warehouse.html', {root: source})});
//admin
app.get('/adminHome', requireLogin, function (req, res) {res.sendFile('adminHome.html', {root: source})});
app.get('/adminAccounts', requireLogin, function (req, res) {res.sendFile('adminAccounts.html', {root: source})});
app.get('/adminTransactionLog', requireLogin, function (req, res) {res.sendFile('adminTransactionLog.html', {root: source})});
app.get('/adminLog', requireLogin, function (req, res) {res.sendFile('adminLog.html', {root: source})});
app.get('/adminWarehouse', requireLogin, function (req, res) {res.sendFile('adminWarehouse.html', {root: source})});

//Controllers
const accountController = require('./Controllers/accountController');
const adminLogController = require('./Controllers/adminLogController');
const transactionLogController = require('./Controllers/transactionLogController');
const cartController = require('./Controllers/cartController');
const warehouseController = require('./Controllers/warehouseController');

//routes
//account
app.route('/api/account/login').post(accountController.checkLogin);
app.route('/api/account/create').post(accountController.checkCreateAccount);
app.route('/api/account').get(accountController.getAccount);
app.route('/api/account').post(accountController.updateAccount);
app.route('/api/account').delete(accountController.deleteCurrentAccount);
app.route('/api/account/delete').post(accountController.deleteUserAccount);
app.route('/api/account/logout').get(accountController.logout);
app.route('/api/account/session').get(accountController.getSession);
//admin log
app.route('/api/adminLogs').get(adminLogController.GetAdminLogs);
app.route('/api/adminLog').post(adminLogController.UpdateAdminLog);
//transaction log
app.route('/api/transactionLog').get(transactionLogController.GetUserTransactionLogs);
app.route('/api/transactionLogs').get(transactionLogController.GetAllTransactionLogs);
//cart
app.route('/api/userCart').post(cartController.GetUserCart);
app.route('/api/myCart').get(cartController.GetMyCart);
app.route('/api/cart/purchase').post(cartController.Purchase)
app.route('/api/cart/add').post(cartController.AddToCart);
app.route('/api/cart/delete').post(cartController.DeleteFromCart);
app.route('/api/cart/changeQuantity').post(cartController.ChangeQuantity);
//warehouse
app.route('/api/favorites').get(warehouseController.GetFavorites);
app.route('/api/favorites/add').post(warehouseController.AddFavorite);
app.route('/api/favorites/remove').post(warehouseController.RemoveFavorite);
app.route('/api/warehouse').get(warehouseController.GetWarehouse);
app.route('/api/warehouse/add').post(warehouseController.AddItem);
app.route('/api/warehouse/edit').post(warehouseController.EditItem);
app.route('/api/warehouse/remove').post(warehouseController.RemoveItem);

app.listen(port, () => {console.log(`Warehouse Management System Website listening on port ${port}`)});

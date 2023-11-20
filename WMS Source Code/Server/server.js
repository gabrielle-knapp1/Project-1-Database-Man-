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

//routes
app.route('/api/account/login').post(accountController.checkLogin);
app.route('/api/account/create').post(accountController.checkCreateAccount);
app.route('/api/account').get(accountController.getAccount);
app.route('/api/account').post(accountController.updateAccount);
app.route('/api/account').delete(accountController.deleteCurrentAccount);
app.route('/api/account/:id').delete(accountController.deleteUserAccount);
app.route('/api/account/logout').get(accountController.logout);
app.route('/api/account/session').get(accountController.getSession);

app.listen(port, () => {console.log(`Warehouse Management System Website listening on port ${port}`)});
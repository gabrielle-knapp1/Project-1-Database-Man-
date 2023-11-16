const express = require('express');
const app = express();
app.use(express.static('WMS Source Code/Client/Public'));
const source = './WMS Source Code/Client/views';
const port = 8080;

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

//views
app.get('/', function (req, res) {res.sendFile('index.html', {root: source})});
app.get('/menu', function (req, res) {res.sendFile('menu.html', {root: source})});
app.get('/cart', function (req, res) {res.sendFile('cart.html', {root: source})});
app.get('/favorites', function (req, res) {res.sendFile('favorites.html', {root: source})});
app.get('/account', function (req, res) {res.sendFile('account.html', {root: source})});
app.get('/transactionLog', function (req, res) {res.sendFile('transactionLog.html', {root: source})});
app.get('/adminUpdateWarehouse', function (req, res) {res.sendFile('adminUpdateWarehouse.html', {root: source})});
app.get('/adminManageUsers', function (req, res) {res.sendFile('adminManageUsers.html', {root: source})});
app.get('/admin', function (req, res) {res.sendFile('admin.html', {root: source})});
app.get('/changePass', function (req, res) {res.sendFile('changePass.html', {root: source})});
app.get('/home', function (req, res) {res.sendFile('home.html', {root: source})});
app.get('/previousTrans', function (req, res) {res.sendFile('previousTrans.html', {root: source})});
app.get('/warehouse', function (req, res) {res.sendFile('warehouse.html', {root: source})});

//Controllers
const accountController = require('./Controllers/accountController');

//routes
app.route('/api/account/login').post(accountController.checkLogin);
app.route('/api/account/create').post(accountController.checkCreateAccount);
app.route('/api/account/login').delete(accountController.deleteRecord);
app.route('/api/account/create').delete(accountController.deleteRecord);

app.listen(port, () => {console.log(`Warehouse Management System Website listening on port ${port}`)});
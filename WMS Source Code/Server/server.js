const express = require('express');
const app = express();
app.use(express.static('Client/Public'));
const port = 8080;

//JSON Parser
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//views
app.get('/', function (req, res) {res.sendFile('index.html', {root: './Client/views'})});
app.get('/menu', function (req, res) {res.sendFile('menu.html', {root: './Client/views'})});
app.get('/cart', function (req, res) {res.sendFile('cart.html', {root: './Client/views'})});
app.get('/favorites', function (req, res) {res.sendFile('favorites.html', {root: './Client/views'})});
app.get('/account', function (req, res) {res.sendFile('account.html', {root: './Client/views'})});
app.get('/transactionLog', function (req, res) {res.sendFile('transactionLog.html', {root: './Client/views'})});
app.get('/adminUpdateWarehouse', function (req, res) {res.sendFile('adminUpdateWarehouse.html', {root: './Client/views'})});
app.get('/adminManageUsers', function (req, res) {res.sendFile('adminManageUsers.html', {root: './Client/views'})});
app.get('/admin', function (req, res) {res.sendFile('admin.html', {root: './Client/views'})});
app.get('/changePass', function (req, res) {res.sendFile('changePass.html', {root: './Client/views'})});
app.get('/home', function (req, res) {res.sendFile('home.html', {root: './Client/views'})});
app.get('/previousTrans', function (req, res) {res.sendFile('previousTrans.html', {root: './Client/views'})});
app.get('/warehouse', function (req, res) {res.sendFile('warehouse.html', {root: './Client/views'})});

//Controllers
const accountController = require('./Controllers/accountController');

//routes
app.route('/api/account/login').post(accountController.checkLogin);
app.route('/api/account/create').post(accountController.checkCreateAccount);
app.route('/api/account/login').delete(accountController.deleteRecord);
app.route('/api/account/create').delete(accountController.deleteRecord);

app.listen(port, () => {console.log(`Warehouse Management System Website listening on port ${port}`)});
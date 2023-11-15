//const account = require('../Modules/account');
const mysql = require('../mysql');
const adminPassword = 'admin123';

async function checkLogin(req, res) {
    let uName = req.body.username;
    let pass = req.body.password;
    let admin = req.body.isAdmin;
    let adminPass = req.body.adminPassword;
    const allAccounts = await mysql.selectQuery("select username, password, isAdmin from accounts");
    let response = {
        loginValid: false,
        message: "Username not found"
    };
    for (let acct of allAccounts) {
        if (acct.username === uName) {
            response.message = "Incorrect password";
            if (acct.password === pass) {
                if (acct.isAdmin && admin) {
                    response.message = "Incorrect admin password";
                    if (adminPass === adminPassword) {
                        response.loginValid = true;
                        response.message = "Login successful";
                    }
                } else {
                    response.loginValid = true;
                    response.message = "Login successful";
                }
            }
            break;
        }
    }
    res.send(response);
}

async function checkCreateAccount(req, res) {
    let uName = req.body.username;
    let pass = req.body.password;
    let admin = req.body.isAdmin;
    let adminPass = req.body.adminPassword;
    const allAccounts = await mysql.selectQuery("select username, password, isAdmin from accounts");
    let response = {
        createValid: false,
        message: ""
    };
    for (let acct of allAccounts) {
        if (acct.username === uName) {
            response.message = "Username already exists";
            res.send(response);
            return;
        }
    }
    if (admin && adminPass !== adminPassword) {
        response.message = "Incorrect admin password";
            res.send(response);
            return;
    }
    response.createValid = true;
    response.message = "Account created";
    mysql.insertQuery("insert into accounts(username, password, isAdmin) values ?", [[uName, pass, admin]]);
    res.send(response);
}

function getCurrAccount(req, res) {
    res.send(account.getCurrAccount());
}

function deleteRecord(req, res) {
    try {
        res.status(204).send(); // Respond with 204 (No Content) on successful deletion
    } catch {
        res.status(404).send({error: 'Rrecord not found'});
    }
}

module.exports = {
    checkLogin,
    checkCreateAccount,
    getCurrAccount,
    deleteRecord
};
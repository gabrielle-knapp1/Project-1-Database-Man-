//const account = require('../Modules/account');
const mysql = require('../mysql');
const account = require('../Modules/account');
const adminPassword = 'admin123';

async function checkLogin(req, res) {
    let uName = req.body.username;
    let pass = req.body.password;
    let admin = req.body.isAdmin;
    let adminPass = req.body.adminPassword;
    let newAcct = new account.Account("", "", false);
    const allAccounts = await mysql.selectQuery("select username, password, isAdmin from vAccounts");
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
                        newAcct = acct;
                    }
                } else {
                    response.loginValid = true;
                    response.message = "Login successful";
                    newAcct = acct;
                }
            }
            break;
        }
    }
    account.setCurrAccount(newAcct);
    res.send(response);
}

async function checkCreateAccount(req, res) {
    let uName = req.body.username;
    let pass = req.body.password;
    let admin = req.body.isAdmin;
    let adminPass = req.body.adminPassword;
    let response = {
        createValid: false,
        message: ""
    };
    if (uName === "" || pass === "" || (admin && adminPass === "")) {
        response.message = "Field cannot be empty";
        res.send(response);
        return;
    }
    const allAccounts = await mysql.selectQuery("select username, password, isAdmin from vAccounts");
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
    mysql.insertQuery("insert into vAccounts(username, password, isAdmin) values ?", [[uName, pass, admin]]);
    account.setCurrAccount(new account.Account(uName, pass, admin));
    res.send(response);
}

async function deleteAccount(req, res) {
    let uName = req.params.id;
    let deletedAcct = await mysql.selectQuery(`select username from vAccounts where username=${uName}`);//this may return an array with 1 element. To fix just put a [0] on the end
    mysql.customQuery(`delete from vAccounts where username=${uName}`);
    res.send(deletedAcct);
}

function updateAccount(req, res) {
    let field = req.body.field;
    let newValue = req.body.newValue;
    let currAcct = account.getCurrAccount();
    currAcct[field] = newValue;
    mysql.customQuery(`update vAccounts set ${field}=${value} where username=${currAcct.username}`);
    account.setCurrAccount(currAcct);
    res.send(currAcct);
}

function deleteRecord(req, res) {
    try {
        res.status(204).send(); // Respond with 204 (No Content) on successful deletion
    } catch {
        res.status(404).send({error: 'Record not found'});
    }
}

module.exports = {
    checkLogin,
    checkCreateAccount,
    deleteAccount,
    updateAccount,
    deleteRecord
};
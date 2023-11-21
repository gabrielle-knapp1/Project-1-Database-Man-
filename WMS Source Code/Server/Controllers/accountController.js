const mysql = require('../mysql');
const universalAdminPassword = 'admin123';
const crypto = require('crypto');

const hashPassword = password => {
    return crypto.createHash('sha256').update(password).digest('hex').substring(0, 20);
};

async function checkLogin(req, res) {
    const { username, password, isAdmin, adminPassword } = req.body;
    const rows = await mysql.selectQuery("select username, password, isAdmin from vAccounts where username=?", [username]);
    let response = {
        loginValid: false,
        message: "Username not found"
    };
    if (rows.length === 0) {
        req.session.destroy();
        return res.send(response);
    } else if (rows.length = 1) {
        response.message = "Incorrect password";
        if (hashPassword(password) === rows[0].password) {
            if (rows[0].isAdmin && isAdmin) {
                response.message = "Incorrect admin password";
                if (adminPassword === universalAdminPassword) {
                    response.loginValid = true;
                    response.message = "Login successful";
                    req.session.username = rows[0].username;
                    req.session.isAdmin = isAdmin;
                } else req.session.destroy();
            } else {
                response.loginValid = true;
                response.message = "Login successful";
                req.session.username = rows[0].username;
                req.session.isAdmin = isAdmin;
            }
        } else req.session.destroy();
    }
    res.send(response);
}

async function checkCreateAccount(req, res) {
    const { username, password, isAdmin, adminPassword } = req.body;
    let response = {
        createValid: false,
        message: ""
    };
    if (username === "" || password === "" || (isAdmin && adminPassword === "")) {
        response.message = "Field cannot be empty";
        req.session.destroy();
        res.send(response);
        return;
    }
    const rows = await mysql.selectQuery("select username, password, isAdmin from vAccounts where username=?", [username]);
    if (rows.length > 0) {
        response.message = "Username already exists";
        req.session.destroy();
        res.send(response);
        return;
    }
    if (isAdmin && adminPassword !== universalAdminPassword) {
        response.message = "Incorrect admin password";
        req.session.destroy();
        res.send(response);
        return;
    }
    response.createValid = true;
    response.message = "Account created";
    req.session.username = username;
    req.session.isAdmin = isAdmin;
    mysql.insertQuery("insert into vAccounts(username, password, isAdmin) values (?, ?, ?)", [username, hashPassword(password), isAdmin]);
    res.send(response);
}

async function getAccount(req, res) {
    const username = req.session.username;
    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const rows = await mysql.selectQuery("select username, firstName, lastName, address, email from vAccounts where username=?", [username]);
    if (rows.length === 1) {
        res.send({ success: true, account: rows[0]});
    } else {
        res.send({ success: false });
    }
}

function updateAccount(req, res) {
    try {
        const { username, password, firstName, lastName, address, email, ogUsername } = req.body;
        let sql = "update vAccounts set ";
        let values = [];
        let changed = false;
        if (username !== '') {
            sql += "username=?, ";
            values.push(username);
            req.session.username = username;
            changed = true;
        }
        if (password !== '') {
            sql += "password=?, ";
            values.push(hashPassword(password));
            changed = true;
        }
        if (firstName !== '') {
            sql += "firstName=?, ";
            values.push(firstName);
            changed = true;
        }
        if (lastName !== '') {
            sql += "lastName=?, ";
            values.push(lastName);
            changed = true;
        }
        if (address !== '') {
            sql += "address=?, ";
            values.push(address);
            changed = true;
        }
        if (email !== '') {
            sql += "email=?, ";
            values.push(email);
            changed = true;
        }
        if (!changed)
            return res.send({ success: false, message: "You must change at least one field." });
        sql = sql.slice(0, -2);
        sql += " where username=?";
        values.push(ogUsername);
        mysql.insertQuery(sql, values)
        res.send({ success: true, message: "Account updated" });
    } catch {
        res.send({ success: false, message: "Unkown error" });
    }
}

function deleteCurrentAccount(req, res) {//to delete your own account
    try {
        const username = req.session.username;
        mysql.insertQuery("delete from vAccounts where username=?", [username]);
        req.session.destroy();
        res.send({success: true, message: "Account deleted"});
    } catch {
        res.send({success: true, message: "Error during account deletion"});
    }
}

async function deleteUserAccount(req, res) {//for admins to delete other user's accounts
    try {
        const username = req.body.username;
        mysql.insertQuery("delete from vAccounts where username=?", [username]);
        const rows = mysql.selectQuery("select max(logID) from vAdminLog", []);
        let maxID = rows[0].logID;
        mysql.insertQuery("insert into vAdminLog(logID, adminUsername, description, timeStamp) values (?, ?, ?, NOW())", [maxID + 1, req.session.username, `Deleted Account: ${username}`])
        res.send({success: true, message: "Account deleted"});
    } catch {
        res.send({success: true, message: "Error during account deletion"});
    }
}

function logout(req, res) {
    req.session.destroy();
    res.send({message: "Your are logged out"});
}

function getSession(req, res) {
    res.send({session: req.session});
}

async function getAccounts(req, res) {
    const rows = await mysql.selectQuery("select username, firstName, lastName, address, email from vAccounts", []);
    res.send({ success: true, accounts: rows});
}

module.exports = {
    checkLogin,
    checkCreateAccount,
    getAccount,
    updateAccount,
    deleteCurrentAccount,
    deleteUserAccount,
    logout,
    getSession,
    getAccounts
};
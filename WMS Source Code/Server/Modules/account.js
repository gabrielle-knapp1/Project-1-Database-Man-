class Account {
    constructor(uName, pass, admin) {
        this.username = uName;
        this.password = pass;
        this.isAdmin = admin;
        this.firstName = "";
        this.lastName = "";
        this.address = "";
        this.email = "";
    }
}

let currAccount;

function createAccount(uName, pass, admin) {
    setCurrAccount(new Account(uName, pass, admin));
}

function getCurrAccount() {
    return currAccount;
}

function setCurrAccount(newAccount) {
    getCurrAccount(newAccount);
    insertQuery('insert or update into accounts (username, password, isAdmin) VALUES ?', [[newAccount.username, newAccount.password, newAccount.isAdmin]]);
}

function deleteAccount() {
    //delete this account from database
    currAccount = new Account("", "", false);
}

module.exports = {
    Account,
    createAccount,
    getCurrAccount,
    setCurrAccount,
    deleteAccount
};
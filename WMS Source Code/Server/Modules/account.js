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

function getCurrAccount() {
    return currAccount;
}

function setCurrAccount(newAccount) {
    currAccount = newAccount;
}

function deleteAccount() {
    currAccount = new Account("", "", false);
}

module.exports = {
    Account,
    getCurrAccount,
    setCurrAccount,
    deleteAccount
};
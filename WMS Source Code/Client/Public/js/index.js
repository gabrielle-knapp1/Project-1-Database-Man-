async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: false,
        adminPassword: ""
    };
    const response = await TryLogin(loginData);
    DeleteLoginRecord()
    if (response.loginValid)
        ChangePage('/home');
    else
        alert(response.message);
}

async function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: false,
        adminPassword: ""
    };
    const response = await TrySignUp(loginData);
    DeleteCreateRecord()
    if (response.createValid)
        ChangePage('/home');
    else
        alert(response.message);
}

async function loginAsAdmin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const adminPass = document.getElementById('adminPassword').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: true,
        adminPassword: adminPass
    };
    const response = await TryLogin(loginData);
    DeleteLoginRecord()
    if (response.loginValid)
        ChangePage('/home');
    else
        alert(response.message);
}

async function signUpAsAdmin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const adminPass = document.getElementById('adminPassword').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: true,
        adminPassword: adminPass
    };
    const response = await TrySignUp(loginData);
    DeleteCreateRecord()
    if (response.createValid)
        ChangePage('/home');
    else
        alert(response.message);
}
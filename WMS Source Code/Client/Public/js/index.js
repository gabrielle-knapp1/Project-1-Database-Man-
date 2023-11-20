function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: false,
        adminPassword: ""
    };
    TryLogin(loginData, "/home");
}

function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: false,
        adminPassword: ""
    };
    TrySignUp(loginData, "/home");
}

function loginAsAdmin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const adminPass = document.getElementById('adminPassword').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: true,
        adminPassword: adminPass
    };
    TryLogin(loginData, "/adminHome");
}

function signUpAsAdmin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const adminPass = document.getElementById('adminPassword').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: true,
        adminPassword: adminPass
    };
    TrySignUp(loginData, "/adminHome");
}

async function TryLogin(loginData, page) {
    try {
        const response = await fetch("/api/account/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(loginData),
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log('Login request sent:', data);
        if (data.loginValid) ChangePage(page);
        else alert(data.message);
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function TrySignUp(loginData, page) {
    try {
        const response = await fetch("/api/account/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(loginData),
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log('Account creation request sent:', data);
        if (data.createValid) ChangePage(page);
        else alert(data.message);
    } catch (error) {
        console.error('Error creating account:', error);
    }
}
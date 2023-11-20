function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {
        username: username,
        password: password,
        isAdmin: false,
        adminPassword: ""
    };
    TryLogin(loginData);
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
    TrySignUp(loginData);
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
    TryLogin(loginData);
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
    TrySignUp(loginData);
}

async function TryLogin(loginData) {
    try {
        const response = await fetch("/api/account/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(loginData),
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log('Login request sent:', data);
        if (data.loginValid) ChangePage('/home');
        else alert(data.message);
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function TrySignUp(loginData) {
    try {
        const response = await fetch("/api/account/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(loginData),
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log('Account creation request sent:', data);
        if (data.createValid) ChangePage('/home');
        else alert(data.message);
    } catch (error) {
        console.error('Error creating account:', error);
    }
}
// AJAX requests
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
       return data;
    } catch (error) {
        console.error('Error during login:', error);
        return {
            loginValid: false,
            message: 'Login failed',
        };
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
        return data;
    } catch (error) {
        console.error('Error creating account:', error);
        return {
            createValid: false,
            message: 'Login failed',
        };
    }
}

function DeleteLoginRecord() {
    fetch("/api/account/login", {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {console.error('Failed to delete login attempt record');}
    }).catch(error => console.error('Error during login attempt record deletion:', error));
}

function DeleteCreateRecord() {
    fetch("/api/account/create", {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {console.error('Failed to delete login attempt record');}
    }).catch(error => console.error('Error during login attempt record deletion:', error));
}
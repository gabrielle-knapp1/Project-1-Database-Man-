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
            message: 'Failed to create account',
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
        if (!response.ok) {console.error('Failed to delete create attempt record');}
    }).catch(error => console.error('Error during create attempt record deletion:', error));
}

function DeleteAccount() {
    fetch("/api/account/:id", {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {console.error('Failed to delete account');}
    }).catch(error => console.error('Error during account deletion:', error));
}

async function UpdateAccount(updateData) {
    try {
        const response = await fetch("/api/account", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(updateData),
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log('Account update request sent:', data);
        return {
            username: data.username,
            password: data.password,
            isAdmin: data.isAdmin,
            message: "Update successful"
        };
    } catch (error) {
        console.error('Error during account update:', error);
        return {
            username: "",
            password: "",
            isAdmin: false,
            message: 'Update failed'
        };
    }
}
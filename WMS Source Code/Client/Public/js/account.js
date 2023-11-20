document.addEventListener('DOMContentLoaded', () => {
    getAccount();
    document.getElementById('updateForm').addEventListener('submit', (event) => {
        event.preventDefault();
        updateAccount();
    });
});

async function getAccount() {
    try {
        const response = await fetch('/api/account', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        if (data.success) {
            document.getElementById('username').innerText += " " + data.account.username;
            document.getElementById('firstName').innerText += " " + data.account.firstName;
            document.getElementById('lastName').innerText += " " + data.account.lastName;
            document.getElementById('address').innerText += " " + data.account.address;
            document.getElementById('email').innerText += " " + data.account.email;
        } else {
            console.error('Failed to get account info');
            alert('Failed to get account info');
        }
    } catch (error) {
        console.error('Failed to get account info:', error);
        alert('Failed to get account info');
    }
}

async function updateAccount() {
    try {
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const firstName = document.getElementById('firstNameInput').value;
        const lastName = document.getElementById('lastNameInput').value;
        const address = document.getElementById('addressInput').value;
        const email = document.getElementById('emailInput').value;
        const ogUsername = document.getElementById('username').innerText.substring(10);

        const response = await fetch('/api/account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, firstName, lastName, address, email, ogUsername }),
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        if (data.success) {
            location.reload();
        } else {
            console.error('Update request failed:');
            alert('Could not update account:' + data.message);
        }
    } catch (error) {
        console.error('Error updating account information:', error);
        alert('An error occurred while updating account info');
    }
}

function ConfirmDeleteAccount() {
    const userConfirmed = confirm('Are you sure you want to delete your account?');
    console.log(userConfirmed);
    if (userConfirmed) DeleteAccount();
    return userConfirmed;
}

async function DeleteAccount() {
    try {
        const response = await fetch('/api/account', {
            method: 'DELETE'
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) ChangePage("/");
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account');
    }
}

async function GoHome() {
    try {
        const response = await fetch('/api/account/session', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (data.session.isAdmin) ChangePage("/adminHome");
        else ChangePage("/home");
    } catch (error) {
        console.error('Failed to get session info:', error);
        alert('Failed to get session info');
    }
}
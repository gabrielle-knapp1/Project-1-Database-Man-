document.addEventListener('DOMContentLoaded', () => {
    getAccount();
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
            //display the data somewhere
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
        //const { username, password, isAdmin, firstName, lastName, address, email, ogUsername };//get the data from the document elements
        const response = await fetch('/api/account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, isAdmin, firstName, lastName, address, email, ogUsername }),
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

function DeleteAccount() {
    //to be implemented
}
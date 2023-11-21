document.addEventListener('DOMContentLoaded', () => {
    RefreshTable();
});

function ConfirmDeleteAccount(username) {
    const userConfirmed = confirm('Are you sure you want to delete this account?');
    console.log(userConfirmed);
    if (userConfirmed) DeleteAccount(username);
    return userConfirmed;
}

async function DeleteAccount(username) {
    try {
        const response = await fetch('/api/account/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username})
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) location.reload();
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting this account');
    }
}

async function RefreshTable() {
    try {
        const response = await fetch('/api/accounts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // Assume you have an array containing account data
            const accountDataArray = data.accounts;

            // Get the table body element
            const tableBody = document.querySelector('tbody');

            // Populate the table with account data
            accountDataArray.forEach(accountData => {
                const row = document.createElement('tr');

                // Create and append table cells for each property in the account data
                Object.values(accountData).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.appendChild(cell);
                });

                // Add the "Delete Account" button
                const deleteButtonCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete Account';
                deleteButton.addEventListener('click', () => ConfirmDeleteAccount(accountData.username));
                deleteButtonCell.appendChild(deleteButton);
                row.appendChild(deleteButtonCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching accounts:', error);
        alert('An error occurred while fetching accounts');
    }
}
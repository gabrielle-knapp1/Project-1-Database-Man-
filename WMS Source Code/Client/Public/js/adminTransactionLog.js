document.addEventListener('DOMContentLoaded', () => {
    RefreshTable();
});

async function RefreshTable() {
    try {
        const response = await fetch('/api/transactionLogs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // Assume you have an array containing log data
            const transactionLogs = data.logs;

            // Get the table body element
            const tableBody = document.getElementById('transactions')

            // Populate the table with log data
            transactionLogs.forEach(log => {
                const row = document.createElement('tr');
                row.id = `logEntry${log.transactionID}`;

                row.appendChild(document.createElement('td')).textContent = log.transactionID;
                row.appendChild(document.createElement('td')).textContent = log.username;
                row.appendChild(document.createElement('td')).textContent = UTC_EST(log.checkoutTime);
                row.appendChild(document.createElement('td')).textContent = UTC_EST(log.expectedDeliveryTime);
                row.appendChild(document.createElement('td')).textContent = UTC_EST(log.borrowReturnTime);
                row.appendChild(document.createElement('td')).textContent = log.borrowState;
                row.appendChild(document.createElement('td')).textContent = log.totalCost;

                const buttonCell = document.createElement('td');
                const viewCartButton = createButton(() => ViewCart(log.username, UTC_EST(log.checkoutTime)));
                buttonCell.appendChild(viewCartButton);

                row.appendChild(buttonCell);

                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching transaction logs:', error);
        alert('An error occurred while fetching transaction logs');
    }
}

function createButton(clickHandler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'View Cart';
    button.classList.add('action-button'); // Add a CSS class for styling
    button.addEventListener('click', clickHandler);
    return button;
}

async function ViewCart(username, checkOutTime) {
    try {
        const response = await fetch('/api/userCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, checkOutTime})
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        const popup = document.getElementById('popup');
        const tableBody = document.getElementById('items');
        tableBody.innerHTML = '';
        if (data.success) {
            // Assume you have an array containing cart data
            const items = data.rows;

            // Populate the table with cart data
            items.forEach(itemRow => {
                const row = document.createElement('tr');
                row.id = `logEntry${itemRow.itemID}`;

                row.appendChild(document.createElement('td')).textContent = itemRow.itemID;
                row.appendChild(document.createElement('td')).textContent = itemRow.name;
                row.appendChild(document.createElement('td')).textContent = itemRow.quantity;
                row.appendChild(document.createElement('td')).textContent = itemRow.borrowing == 1;
                row.appendChild(document.createElement('td')).textContent = itemRow.checkedOut == 1;
                row.appendChild(document.createElement('td')).textContent = '$' + itemRow.pricePerUnit;
                row.appendChild(document.createElement('td')).textContent = '$' + itemRow.totalPrice;

                tableBody.appendChild(row);
            });

            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    } catch (error) {
        console.error('Error getting cart info:', error);
        alert('An error occurred while getting cart info');
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    RefreshCart();
});

async function RefreshCart() {
    try {
        const response = await fetch('/api/getMyCart', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // Assume you have an array containing cart data
            const cart = data.rows;

            // Get the table body element
            const tableBody = document.querySelector('tbody');

            // Populate the table with cart data
            cart.forEach(itemRow => {
                const row = document.createElement('tr');
                row.id = `logEntry${itemRow.itemID}`;

                row.appendChild(document.createElement('td')).textContent = itemRow.itemID;
                row.appendChild(document.createElement('td')).textContent = itemRow.name;
                row.appendChild(document.createElement('td')).textContent = itemRow.quantity;
                row.appendChild(document.createElement('td')).textContent = itemRow.borrowing == 1;
                row.appendChild(document.createElement('td')).textContent = '$' + itemRow.pricePerUnit;
                row.appendChild(document.createElement('td')).textContent = '$' + itemRow.totalPrice;

                const buttonCell = document.createElement('td');
                const editButton = createButton(() => OpenPopup("editItemPopup"));
                buttonCell.appendChild(editButton);
                row.appendChild(buttonCell);

                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        alert('An error occurred while fetching cart');
    }
}

function createButton(clickHandler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Edit Item';
    button.classList.add('action-button'); // Add a CSS class for styling
    button.addEventListener('click', clickHandler);
    return button;
}

function OpenPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'block';
}

function ClosePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'none';
}

function CheckOut() {
    OpenPopup('checkOutPopup');
    //Do stuff
}

function SubmitTransaction() {
    //Do stuff
    ClosePopup('ClosePopup');
}
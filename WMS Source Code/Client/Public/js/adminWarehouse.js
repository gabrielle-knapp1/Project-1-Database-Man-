/**
 * If this all works then you can keep it as it is,
 * but if you look at some of the other files like adminLog.js, adminTransactionLog.js, or cart.js
 * you can see how to get the data from the database and properly add rows to the table.
 * 
 * I've also added the css for pop-ups to the global.css file.
 * You can see how I added pop-ups if you look at adminTransactionLog.html and adminTransactionLog.js.
 */
document.addEventListener('DOMContentLoaded', () => {
    RefreshTable();
});

async function RefreshTable() {
    try {
        const response = await fetch('/api/warehouse', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // Assume you have an array containing warehouse data called "Items"
            const warehouse = data.Items;

            // Get the table body element
            const tableBody = document.querySelector('tbody');

            // Populate the table with item data
            warehouse.forEach(item => {
                const row = document.createElement('tr');
                row.id = `itemEntry${item.itemID}`;

                const descriptionCell = document.createElement('td');

                row.appendChild(document.createElement('td')).textContent = item.itemID;
                row.appendChild(document.createElement('td')).textContent = item.type;
                row.appendChild(document.createElement('td')).textContent = item.name;
                row.appendChild(document.createElement('td')).textContent = item.providerID;
                row.appendChild(document.createElement('td')).textContent = item.placeID;
                row.appendChild(document.createElement('td')).textContent = item.pricePerUnit;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching warehouse data:', error);
        alert('An error occurred while fetching warehouse data');
    }
}

function addItem() {
    // Add fake item data
    var fakeItem = {
        id: 7,
        product: 'New Product',
        quantity: 5,
        price: '$100.00',
    };

    // Add the new item to the table
    var table = document.querySelector('table tbody');
    var newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = `<td><button onclick="openModal(${fakeItem.id})">${fakeItem.id}</button></td>
                        <td>${fakeItem.product}</td>
                        <td>${fakeItem.quantity}</td>
                        <td>${fakeItem.price}</td>
                        <td>
                            <button onclick="editItem(${fakeItem.id})">Edit Item</button>
                            <button onclick="removeItem(this)">Remove Item</button>
                        </td>`;
}

function openModal(id) {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modalContent");

    // Set the content of the modal (you can customize this)
    modalContent.innerHTML = 'Content for ID ' + id;

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function editItem(id) {
    var table = document.querySelector('table tbody');
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var rowId = rows[i].getElementsByTagName('button')[0].textContent;
        if (rowId === id.toString()) {
            makeRowEditable(rows[i]);
            break;
        }
    }
}

function makeRowEditable(row) {
    var cells = row.getElementsByTagName('td');
    var originalRowHTML = row.innerHTML;

    for (var i = 1; i < cells.length - 1; i++) {
        var content = cells[i].textContent;
        var input = document.createElement('input');
        input.type = 'text';
        input.value = content;
        cells[i].innerHTML = '';
        cells[i].appendChild(input);
    }

    var actionsCell = cells[cells.length - 1];
    actionsCell.innerHTML = `
<button onclick="saveChanges(this)">Save Changes</button>
<button onclick="cancelEdit(this, '${originalRowHTML}')">Cancel</button>`;
}

function saveChanges(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    for (var i = 1; i < cells.length - 1; i++) {
        var input = cells[i].getElementsByTagName('input')[0];
        if (input) {
            cells[i].textContent = input.value;
        }
    }

    var actionsCell = cells[cells.length - 1];
    actionsCell.innerHTML = `
<button onclick="editItem(${row.cells[0].textContent})">Edit Item</button>
<button onclick="removeItem(this)">Remove Item</button>`;
}

function cancelEdit(button, originalRowHTML) {
    var row = button.parentNode.parentNode;
    row.innerHTML = originalRowHTML;
}

function removeItem(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
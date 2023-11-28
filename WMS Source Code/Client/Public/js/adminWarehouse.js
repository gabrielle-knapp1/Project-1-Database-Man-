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
            const warehouse = data.items;

            // Get the table body element
            const tableBody = document.querySelector('tbody');

            // Populate the table with item data
            warehouse.forEach(item => {
                const row = document.createElement('tr');
                row.id = `itemEntry${item.itemID}`;

                //const descriptionCell = document.createElement('td');

                row.appendChild(document.createElement('td')).textContent = item.itemID;
                row.appendChild(document.createElement('td')).textContent = item.type;
                row.appendChild(document.createElement('td')).textContent = item.name;
                row.appendChild(document.createElement('td')).textContent = item.providerID;
                row.appendChild(document.createElement('td')).textContent = item.placeID;
                row.appendChild(document.createElement('td')).textContent = item.pricePerUnit;
                //row.appendChild(createButton("Remove Item", () => removeItem));
                row.appendChild(createButton("Edit Item", () => editItem(item.itemID)));
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching warehouse data:', error);
        alert('An error occurred while fetching warehouse data');
    }
}
/* This needs to be created as a thing before we can create the button
async function removeItem(){
//Here I'll need to remove the item from the favorites table in the database
const favoriteID = parseInt(document.getElementById('favoriteID').dataset.info);
try {
    const response = await fetch('/api/ware/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({favoriteID})
    });
    if (!response.ok) {throw new Error('Network response was not ok');}
    const data = await response.json();
    console.log(data);
    if (data.success) {
        location.reload();
    }
} catch (error) {
    console.error('Error removing item from favorites:', error);
    alert('An error occurred while removing item from favorites');
}
}
*/
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.classList.add('action-button'); // Add a CSS class for styling
    button.addEventListener('click', clickHandler);
    return button;
}
/**
 * All of the functions below do not update the database, they just change the html code, which isn't sufficient.
 * When you add/edit/remove an item, it should simply be inserted/updated/deleted in the database, then all you need to do is refresh the page.
 * See warehouseController.js and cartController.js
 */

/**@deprecated*/
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

/**@deprecated*/
function openModal(id) {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modalContent");

    // Set the content of the modal (you can customize this)
    modalContent.innerHTML = 'Content for ID ' + id;

    modal.style.display = "block";
}

/**@deprecated*/
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

/**@deprecated*/
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

/**@deprecated*/
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

/**@deprecated*/
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

/**@deprecated*/
function cancelEdit(button, originalRowHTML) {
    var row = button.parentNode.parentNode;
    row.innerHTML = originalRowHTML;
}

/**@deprecated*/
function removeItem(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
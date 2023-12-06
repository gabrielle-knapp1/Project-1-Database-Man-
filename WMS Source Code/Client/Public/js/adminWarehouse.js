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
                row.appendChild(document.createElement('td')).textContent = item.name;
                row.appendChild(document.createElement('td')).textContent = item.stockQuantity;
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

function editItem(id) {
    var table = document.querySelector('tbody');
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var rowId = rows[i].getElementsByTagName('td')[0].textContent;
        if (rowId === id.toString()) {
            makeRowEditable(rows[i]);
            break;
        }
    }
}

async function addItem() {
    try {
        const newItem = {name: 'New Product', stockQuantity: 5, pricePerUnit: 100};//default item
        const response = await fetch('/api/warehouse/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        if (data.success) {
            // Add the new item to the table
            const tableBody = document.querySelector('tbody');
            const newRow = createRow(newItem);
            tableBody.appendChild(newRow);

            // Refresh the entire table
            RefreshTable();
        }
    } catch (error) {
        console.error('Error adding item:', error);
        alert('An error occurred while adding item');
    }
}

function createRow(item) {
    const row = document.createElement('tr');
    row.id = `itemEntry${item.itemID}`;

    row.appendChild(document.createElement('td')).textContent = item.itemID;
    row.appendChild(document.createElement('td')).textContent = item.name;
    row.appendChild(document.createElement('td')).textContent = item.stockQuantity;
    row.appendChild(document.createElement('td')).textContent = item.pricePerUnit;
    row.appendChild(createButton("Edit Item", () => editItem(item.itemID)));

    return row;
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.classList.add('action-button'); // Add a CSS class for styling
    button.addEventListener('click', clickHandler);
    return button;
}
async function updateItem(itemID, name, stockQuantity, pricePerUnit) {
    try {
        const response = await fetch('/api/warehouse/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({itemID, name, stockQuantity, pricePerUnit})
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) location.reload();
    } catch (error) {
        console.error('Error updating item:', error);
        alert('An error occurred while updating item');
    }
}
function makeRowEditable(row) {
    var cells = row.getElementsByTagName('td');
    var originalRowHTML = row.innerHTML;

    // Extract the item ID from the first cell
    var originalItemID = cells[0].textContent;

    for (var i = 1; i < cells.length - 1; i++) {
        var content = cells[i].textContent;
        var input = document.createElement('input');
        input.type = 'text';
        input.value = content;
        cells[i].appendChild(input);
    }
    row.appendChild(createButton("Save Item", () => updateItem(cells[0].textContent,
        cells[1].textContent,
        cells[2].textContent,
        cells[3].textContent)));
        
    //var actionsCell = cells[cells.length - 1];
    
}

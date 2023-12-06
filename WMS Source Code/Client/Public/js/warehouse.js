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
            tableBody.innerHTML = '';

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
                row.appendChild(createButton("Add to Favorites", () => addFav(item.itemID)));
                row.appendChild(createButton("Add to Cart", () => addCart(item.itemID)));

                /**
                 * Don't forget to create the buttons to add this item to the cart and to add this item as a favorite
                 * See warehouseController.js and cartController.js
                 */

                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching warehouse data:', error);
        alert('An error occurred while fetching warehouse data');
    }
}

async function addFav(id){
    try {
        const response = await fetch('/api/favorites/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) RefreshTable();
    } catch (error) {
        console.error('Error adding item to favorites:', error);
        alert('An error occurred while adding item to favorites');
    }
}

async function addCart(id){
    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) RefreshTable();
    } catch (error) {
        console.error('Error adding item to cart:', error);
        alert('An error occurred while adding item to cart');
    }

}
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.classList.add('action-button'); // Add a CSS class for styling
    button.addEventListener('click', clickHandler);
    return button;
}

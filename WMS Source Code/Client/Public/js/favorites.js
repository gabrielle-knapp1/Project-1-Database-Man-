document.addEventListener('DOMContentLoaded', () => {
    RefreshTable();
});

async function RefreshTable() {
    try {
        const response = await fetch('/api/favorites', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // Assume you have an array containing favorites data called "Favorites"
            const favorites = data.items;

            // Get the table body element
            const tableBody = document.querySelector('tbody');

            // Populate the table with item data
            favorites.forEach(item => {
                const row = document.createElement('tr');
                row.id = `itemEntry${item.favoriteID}`;

                //const descriptionCell = document.createElement('td');

                row.appendChild(document.createElement('td')).textContent = item.favoriteID;
                row.appendChild(document.createElement('td')).textContent = item.username;
                row.appendChild(document.createElement('td')).textContent = item.itemID;
                row.appendChild(createButton("Remove Item", () => removeItem));
                row.appendChild(createButton("Add to Cart", () => addCart));
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching favorites data:', error);
        alert('An error occurred while fetching favorites data');
    }
}
async function removeItem(){
//Here I'll need to remove the item from the favorites table in the database
const favoriteID = parseInt(document.getElementById('favoriteID').dataset.info);
try {
    const response = await fetch('/api/favorites/delete', {
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

function addCart(){
    //Here I'll need to add this to the cart table in the database
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.classList.add('action-button'); // Add a CSS class for styling
    button.addEventListener('click', clickHandler);
    return button;
}
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

                const descriptionCell = document.createElement('td');

                row.appendChild(document.createElement('td')).textContent = item.favoriteID;
                row.appendChild(document.createElement('td')).textContent = item.username;
                row.appendChild(document.createElement('td')).textContent = item.itemID;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching favorites data:', error);
        alert('An error occurred while fetching favorites data');
    }
}

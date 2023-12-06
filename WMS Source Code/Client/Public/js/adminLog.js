document.addEventListener('DOMContentLoaded', () => {
    RefreshTable();
});

async function RefreshTable() {
    try {
        const response = await fetch('/api/adminLogs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) {
            // Assume you have an array containing log data
            const adminLogs = data.logs;

            // Get the table body element
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = '';

            // Populate the table with log data
            adminLogs.forEach(log => {
                const row = document.createElement('tr');
                row.id = `logEntry${log.logID}`;

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = log.description;

                // Check if the description contains a borrow request
                if (log.description.includes(' Requested to Borrow Item: ')) {
                    const acceptButton = createButton('Accept', () => acceptRequest(log, descriptionCell));
                    const denyButton = createButton('Deny', () => denyRequest(log, descriptionCell));

                    descriptionCell.appendChild(acceptButton);
                    descriptionCell.appendChild(denyButton);
                }

                row.appendChild(document.createElement('td')).textContent = log.logID;
                row.appendChild(document.createElement('td')).textContent = log.adminUsername;
                row.appendChild(descriptionCell);
                row.appendChild(document.createElement('td')).textContent = log.timeStamp;

                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching admin logs:', error);
        alert('An error occurred while fetching admin logs');
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

function acceptRequest(log, descriptionCell) {
    console.log(`Accept request for log ID ${log.logID}`);
    const { username, itemName } = parseDescription(log.description);
    const newDescription = `${username}'s Request to Borrow Item: ${itemName} was Accepted`;
    descriptionCell.textContent = newDescription;
    updateAdminLogDescription(log.logID, newDescription, true);
}

function denyRequest(log, descriptionCell) {
    console.log(`Deny request for log ID ${log.logID}`);
    const { username, itemName } = parseDescription(log.description);
    const newDescription = `${username}'s Request to Borrow Item: ${itemName} was Denied`;
    descriptionCell.textContent = newDescription;
    updateAdminLogDescription(log.logID, newDescription, false);
}

function parseDescription(description) {
    const match = description.match(/(\w+) Requested to Borrow Item: (\w+)/);
    return match ? { username: match[1], itemName: match[2] } : { username: '', itemName: '' };
}

async function updateAdminLogDescription(logID, description, accepted) {
    try {
        const response = await fetch('/api/adminLog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({logID, description, accepted})
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
        if (data.success) RefreshTable();
    } catch (error) {
        console.error('Error updating admin log:', error);
        alert('An error occurred while updating the admin log');
    }
}
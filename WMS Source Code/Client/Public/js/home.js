document.addEventListener('DOMContentLoaded', () => {
    setWelcomeText();
});

async function setWelcomeText() {
    try {
        const response = await fetch('/api/account', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        if (data.success) {
            document.getElementById('welcome').innerText = `Hello ${data.account.firstName}! Welcome to the Main Menu of the Warehouse Management System!`;
        } else {
            console.error('Failed to get account info');
            alert('Failed to get account info');
        }
    } catch (error) {
        console.error('Failed to get account info:', error);
        alert('Failed to get account info');
    }
}
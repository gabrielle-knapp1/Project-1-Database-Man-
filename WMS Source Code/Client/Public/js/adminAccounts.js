async function DeleteAccount(username) {
    try {
        const response = await fetch('/api/account/' + username, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting this account');
    }
}
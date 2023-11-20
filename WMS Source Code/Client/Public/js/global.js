function ChangePage(page) {
    //When you change the page, the program should check to make
    //sure the user is logged in.
    //If you type in the URL with a /home at the end, it would bypass the login.
    //We need to prevent this.
    location.href = page;
}

async function LogOut() {
    try {
        const response = await fetch('/api/account/logout', {
            method: 'GET',
        });
        if (response.ok) {
            ChangePage('/');
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}
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

//converts from a UTC string to an EST string
function UTC_EST(inputDate) {
    const dateObject = new Date(inputDate);

    // Format the date in Eastern Standard Time (EST)
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');

    // Format the date in 'YYYY-MM-DD HH:mm:ss' in Eastern Standard Time (EST)
    const estFormattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return estFormattedDatetime;
}
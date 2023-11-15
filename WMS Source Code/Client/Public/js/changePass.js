function login() {
    // You can perform any login logic here if needed
    const username = document.getElementById('username').value;
    const newPassword = document.getElementById('password').value;

    alert(`New User Info\nUsername: ${username}\nPassword: ${newPassword}`);
    // Redirect to another HTML page
    window.location.href = "home.html";
}
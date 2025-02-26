// Load user data from JSON
async function fetchUsers() {
    const response = await fetch('users.json');
    return response.json();
}

// Login function
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    const users = await fetchUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('call-container').style.display = 'block';
        document.getElementById('user-name').innerText = user.username;
    } else {
        errorMsg.innerText = "Invalid username or password!";
    }
}

// Check if already logged in
window.onload = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('call-container').style.display = 'block';
        document.getElementById('user-name').innerText = JSON.parse(storedUser).username;
    }
};

// Fake Call Handling
function startCall() {
    document.getElementById('call-status').innerText = "🔵 Calling...";
    setTimeout(() => {
        document.getElementById('call-status').innerText = "🟢 Connected!";
    }, 2000);
}

function endCall() {
    document.getElementById('call-status').innerText = "🔴 Call Ended";
}

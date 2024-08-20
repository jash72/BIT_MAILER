// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjRgvekqCqJT0HQXSX7T1uB4RLBB08s-c",
    authDomain: "bitmailer-1c622.firebaseapp.com",
    projectId: "bitmailer-1c622",
    storageBucket: "bitmailer-1c622.appspot.com",
    messagingSenderId: "462433082836",
    appId: "1:462433082836:web:062756acb1be9c0cd80a41",
    measurementId: "G-ZS7T5H77LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to sign out the user
window.signOutUser = () => {
    signOut(auth).then(() => {
        localStorage.removeItem('userDisplayName');
        localStorage.removeItem('userIcon');
        window.location.href = 'http://127.0.0.1:8080/index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
};

// On page load, check authentication status and update UI
window.onload = () => {
    const userDisplayName = localStorage.getItem('userDisplayName');
    const userIcon = localStorage.getItem('userIcon');

    if (userDisplayName && userIcon) {
        document.getElementById('user-name').textContent = userDisplayName;
        document.getElementById('user-icon').textContent = userIcon;
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName || 'User';
                const icon = (user.displayName || 'U').charAt(0).toUpperCase();
                localStorage.setItem('userDisplayName', displayName);
                localStorage.setItem('userIcon', icon);

                document.getElementById('user-name').textContent = displayName;
                document.getElementById('user-icon').textContent = icon;
            } else {
                window.location.href = 'http://127.0.0.1:8080/index.html';
            }
        });
    }
};

// Navigate to Mail Request Form
function goToMailRequest() {
    window.location.href = 'http://127.0.0.1:8080/mail_request_form.html';
}

// Toggle between light and dark theme
window.toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    updateThemeIcon();
}

// Update the theme toggle button icon based on the current theme
function updateThemeIcon() {
    const body = document.body;
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '🌞'; // Sun icon for light theme
    } else {
        themeToggleButton.textContent = '🌙'; // Moon icon for dark theme
    }
}
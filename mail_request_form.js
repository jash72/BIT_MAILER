// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

// Initialize Firebase
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to update the theme icon based on the current theme
function updateThemeIcon() {
    const body = document.body;
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '🌞'; // Sun icon for light theme
    } else {
        themeToggleButton.textContent = '🌙'; // Moon icon for dark theme
    }
}

// Function to toggle between light and dark themes
window.toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    updateThemeIcon();
};

// Function to sign out the user
window.signOutUser = () => {
    auth.signOut().then(() => {
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
        auth.onAuthStateChanged((user) => {
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
    updateThemeIcon(); // Ensure the theme icon is correct on page load
};
document.addEventListener('DOMContentLoaded', () => {
    // Populate user info on page load
    const userDisplayName = localStorage.getItem('userDisplayName');
    const userIcon = localStorage.getItem('userIcon');

    if (userDisplayName && userIcon) {
        document.getElementById('user-name').textContent = userDisplayName;
        document.getElementById('user-icon').textContent = userIcon;
    } else {
        window.location.href = 'http://127.0.0.1:8080/index.html';
    }

    // Theme toggle function
    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
    };

    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    // Logout function
    const signOutUser = () => {
        localStorage.clear();
        window.location.href = 'http://127.0.0.1:8080/index.html';
    };

    document.querySelector('.logout-btn').addEventListener('click', signOutUser);

    // Reset form function
    const resetForm = () => {
        document.getElementById('mail-request-form').reset();
    };

    document.querySelector('.new-form-btn').addEventListener('click', resetForm);
});

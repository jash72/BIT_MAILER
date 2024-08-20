import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDjRgvekqCqJT0HQXSX7T1uB4RLBB08s-c",
    authDomain: "bitmailer-1c622.firebaseapp.com",
    projectId: "bitmailer-1c622",
    storageBucket: "bitmailer-1c622.appspot.com",
    messagingSenderId: "462433082836",
    appId: "1:462433082836:web:062756acb1be9c0cd80a41",
    measurementId: "G-ZS7T5H77LH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signOutUser = () => {
    signOut(auth).then(() => {
        window.location.href = 'http://127.0.0.1:8080/index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
};

window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById('user-name').textContent = user.displayName;
            const firstLetter = user.displayName.charAt(0).toUpperCase();
            document.getElementById('user-icon').textContent = firstLetter;
        } else {
            window.location.href = 'http://127.0.0.1:8080/index.html'; // Update to your local server address
        }
    });
};

window.onload = () => {
    const user = {
        displayName: localStorage.getItem('userName') || 'User',
    };

    // Set user name and icon
    document.getElementById('user-name').textContent = user.displayName;
    document.getElementById('user-icon').textContent = user.displayName.charAt(0);

    // Check if the user is logged in
    if (!user.displayName) {
        window.location.href = 'http://127.0.0.1:8080/index.html';
    }
};

function toggleTheme() {
    var body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        document.querySelector('.theme-toggle').textContent = '🌜';
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        document.querySelector('.theme-toggle').textContent = '🌞';
    }
}


window.onload = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userName = user.displayName;
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-icon').textContent = userName.charAt(0).toUpperCase();
        } else {
            window.location.href = 'http://127.0.0.1:8080/index.html';
        }
    });
};

function goToMailRequest() {
    window.location.href = 'mail_request_form.html';  // Update this with the correct path
}

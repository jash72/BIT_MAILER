import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

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

function updateThemeIcon() {
    const body = document.body;
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '🌞'; 
    } else {
        themeToggleButton.textContent = '🌙'; 
    }
}

window.toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    updateThemeIcon();
};

window.signOutUser = () => {
    signOut(auth).then(() => {
        localStorage.clear();
        window.location.href = '/index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
};

window.goToMailRequest = () => {
    window.location.href = '/mail_request_form.html';
}

window.onload = () => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const submissionsContainer = document.getElementById('submitted-forms-container');

    if (formSubmissions.length === 0) {
        submissionsContainer.innerHTML = '<p>No submissions yet.</p>';
    } else {
        formSubmissions.forEach(submission => {
            const box = document.createElement('div');
            box.classList.add('submission-box');
            box.innerHTML = `
                <h4>${submission.subject}</h4>
                <p><strong>To:</strong> ${submission.to}</p>
                <p><strong>Date:</strong> ${submission.date}</p>
                <p><strong>From:</strong> ${submission.fromTime}</p>
                <p><strong>To:</strong> ${submission.toTime}</p>
                <p><strong>Department:</strong> ${submission.department}</p>
                <p><strong>Year:</strong> ${submission.year}</p>
                <span class="status ${submission.status === 'Accepted' ? 'status-accepted' : submission.status === 'Rejected' ? 'status-rejected' : 'status-pending'}">${submission.status}</span>
                <button onclick='showFormDetails(${formSubmissions.indexOf(submission)})'>View Content</button>
                <button style='background-color: Red;' onclick='deleteFormDetails(${formSubmissions.indexOf(submission)})'>Delete</button>
            `;

            if (submission.status === 'Rejected') {
                box.innerHTML += `<p class="rejection-reason"><strong>Reason:</strong> ${submission.rejectionReason}</p>`;
            }
            submissionsContainer.appendChild(box);
        });
    }

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
                window.location.href = '/index.html';
            }
        });
    }
    updateThemeIcon();
};

window.showFormDetails = (index) => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const submission = formSubmissions[index];

    document.getElementById('form-details').innerHTML = `
        <p><strong>Subject:</strong> ${submission.subject}</p>
        <p><strong>To:</strong> ${submission.to}</p>
        <p><strong>Date:</strong> ${submission.date}</p>
        <p><strong>From Time:</strong> ${submission.fromTime}</p>
        <p><strong>To Time:</strong> ${submission.toTime}</p>
        <p><strong>Department:</strong> ${submission.department}</p>
        <p><strong>Year:</strong> ${submission.year}</p>
        <p><strong>Content:</strong> ${submission.content}</p>
    `;

    document.getElementById('form-details-modal').style.display = 'block';
};

window.closeModal = () => {
    document.getElementById('form-details-modal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('form-details-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};



window.deleteFormDetails = (index) => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    formSubmissions.splice(index, 1);
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));
    window.location.reload();
};

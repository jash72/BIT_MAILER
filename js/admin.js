
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

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


window.onload = () => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const pendingFormsList = document.getElementById('pending-forms-list');
    const acceptedFormsList = document.getElementById('accepted-forms-list');
    const rejectedFormsList = document.getElementById('rejected-forms-list');

    pendingFormsList.innerHTML = '';
    acceptedFormsList.innerHTML = '';
    rejectedFormsList.innerHTML = '';

    formSubmissions.forEach((submission, index) => {
        const formItem = document.createElement('div');
        formItem.classList.add('form-item');
        formItem.innerHTML = `
            <h4>${submission.subject}</h4>
            <p><strong>Submitted by:</strong> ${submission.to}</p>
            <p><strong>Status:</strong> ${submission.status}</p>
            ${submission.rejectionReason ? `<p><strong>Rejection Reason:</strong> ${submission.rejectionReason}</p>` : ''}
            <button style="background-color: rgb(87, 87, 244);" class="view-details" onclick='showFormDetails(${index})'>View Details</button>
        `;

        if (submission.status === 'Accepted') {
            acceptedFormsList.appendChild(formItem);
        } else if (submission.status === 'Rejected') {
            rejectedFormsList.appendChild(formItem);
        }
        else {
            formItem.innerHTML += `
                <button class="accept-btn" onclick='acceptForm(${index})'>Accept</button>
                <button class="reject-btn" onclick='openRejectionModal(${index})'>Reject</button>
            `;
            pendingFormsList.appendChild(formItem);
            }
    });

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = '/index.html';
        }
    });
};

window.showPendingForms = () => {
    document.getElementById('pending-forms-section').style.display = 'block';
    document.getElementById('accepted-forms-section').style.display = 'none';
    document.getElementById('rejected-forms-section').style.display = 'none';
};

window.showAcceptedForms = () => {
    document.getElementById('pending-forms-section').style.display = 'none';
    document.getElementById('accepted-forms-section').style.display = 'block';
    document.getElementById('rejected-forms-section').style.display = 'none';
};

window.showRejectedForms = () => {
    document.getElementById('pending-forms-section').style.display = 'none';
    document.getElementById('accepted-forms-section').style.display = 'none';
    document.getElementById('rejected-forms-section').style.display = 'block';
};

window.acceptForm = (index) => {
    updateFormStatus(index, 'Accepted');
    window.location.href = 'admin.html';  
    showAcceptedForms();
};


window.openRejectionModal = (index) => {
    const modal = document.getElementById('rejection-modal');
    modal.style.display = 'block';
    window.currentIndex = index;  
};


window.closeRejectionModal = () => {
    const modal = document.getElementById('rejection-modal');
    modal.style.display = 'none';
};


window.submitRejectionReason = () => {
    const reason = document.getElementById('rejection-reason').value.trim();
    if (reason) {
        updateFormStatus(window.currentIndex, 'Rejected', reason);
        closeRejectionModal();
        window.location.href = '/admin.html';  
        showRejectedForms();
    } else {
        alert('Please provide a reason for rejection.');
    }
};

function updateFormStatus(index, status, rejectionReason = '') {
    let formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    formSubmissions[index].status = status;
    if (status === 'Rejected') {
        formSubmissions[index].rejectionReason = rejectionReason;
    }
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));

    window.location.href='/admin.html';
}

window.showFormDetails = (index) => {
    window.location.href = `form-details.html?index=${index}`;
};

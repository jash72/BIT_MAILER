// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

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

window.onload = () => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const formListContainer = document.querySelector('.form-list');
    const submissionListContainer = document.getElementById('submission-list');
    
    if (formSubmissions.length === 0) {
        formListContainer.innerHTML = '<p>No pending forms.</p>';
    } else {
        formSubmissions.forEach((submission, index) => {
            if (submission.status === 'Pending') {
                const formItem = document.createElement('div');
                formItem.classList.add('form-item');
                formItem.innerHTML = `
                    <h4>${submission.subject}</h4>
                    <p><strong>Submitted by:</strong> ${submission.to}</p>
                    <button class="view-details" onclick='showFormDetails(${index})'>View Details</button>
                    <button class="accept-btn" onclick='acceptForm(${index})'>Accept</button>
                    <button class="reject-btn" onclick='openRejectionModal(${index})'>Reject</button>
                `;
                formListContainer.appendChild(formItem);
            }
        });
    }

    // Handle user authentication
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'http://127.0.0.1:8080/index.html';
        }
    });

    // Handle "View Submissions" click
    const viewSubmissionsBtn = document.getElementById('view-submissions');
    viewSubmissionsBtn.onclick = () => {
        formListContainer.style.display = 'none'; // Hide pending forms
        submissionListContainer.style.display = 'block'; // Show submitted forms

        submissionListContainer.innerHTML = ''; // Clear previous content
        if (formSubmissions.length === 0) {
            submissionListContainer.innerHTML = '<p>No submissions found.</p>';
        } else {
            formSubmissions.forEach((submission, index) => {
                const submissionItem = document.createElement('div');
                submissionItem.classList.add('form-item');
                submissionItem.innerHTML = `
                    <h4>${submission.subject}</h4>
                    <p><strong>Submitted by:</strong> ${submission.to}</p>
                    <p><strong>Status:</strong> ${submission.status}</p>
                    ${submission.rejectionReason ? `<p><strong>Rejection Reason:</strong> ${submission.rejectionReason}</p>` : ''}
                    <button class="view-details" onclick='showFormDetails(${index})'>View Details</button>
                `;
                submissionListContainer.appendChild(submissionItem);
            });
        }
    };
};

// Existing functions (openRejectionModal, closeRejectionModal, submitRejectionReason, acceptForm, updateFormStatus, showFormDetails) remain unchanged


// Function to open rejection modal
window.openRejectionModal = (index) => {
    const modal = document.getElementById('rejection-modal');
    modal.style.display = 'block';

    const submitReasonBtn = document.querySelector('.submit-reason');
    submitReasonBtn.onclick = () => submitRejectionReason(index);
};

// Function to close rejection modal
window.closeRejectionModal = () => {
    const modal = document.getElementById('rejection-modal');
    modal.style.display = 'none';
};

// Function to submit rejection reason
window.submitRejectionReason = (index) => {
    const reason = document.getElementById('rejection-reason').value.trim();
    if (reason) {
        updateFormStatus(index, 'Rejected', reason);
        closeRejectionModal();
    } else {
        alert('Please provide a reason for rejection.');
    }
};

// Function to accept form
window.acceptForm = (index) => {
    updateFormStatus(index, 'Accepted');
};

// Function to update form status in localStorage
function updateFormStatus(index, status, rejectionReason = '') {
    let formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    formSubmissions[index].status = status;
    if (status === 'Rejected') {
        formSubmissions[index].rejectionReason = rejectionReason;
    }
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));

    // Reload the page to reflect changes
    window.location.reload();
}

// Function to show form details
window.showFormDetails = (index) => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const submission = formSubmissions[index];
    alert(`
        Subject: ${submission.subject}\n
        To: ${submission.to}\n
        Date: ${submission.date}\n
        From Time: ${submission.fromTime}\n
        To Time: ${submission.toTime}\n
        Department: ${submission.department}\n
        Year: ${submission.year}\n
        Content: ${submission.content}
    `);
};
window.showFormDetails = (index) => {
    // Redirect to form details page with the form index as a query parameter
    window.location.href = `form-details.html?index=${index}`;
};
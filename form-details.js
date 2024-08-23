// Extract the form index from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const formIndex = urlParams.get('index');

document.addEventListener('DOMContentLoaded', () => {
    const formDetailsContainer = document.getElementById('form-details');
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const form = formSubmissions[formIndex];

    if (form) {
        formDetailsContainer.innerHTML = `
            <p><strong>Subject:</strong> ${form.subject}</p>
            <p><strong>To:</strong> ${form.to}</p>
            <p><strong>Date:</strong> ${form.date}</p>
            <p><strong>From Time:</strong> ${form.fromTime}</p>
            <p><strong>To Time:</strong> ${form.toTime}</p>
            <p><strong>Department:</strong> ${form.department}</p>
            <p><strong>Year:</strong> ${form.year}</p>
            <p><strong>Content:</strong> ${form.content}</p>
            <p><strong>Status:</strong> ${form.status}</p>
        `;
    } else {
        formDetailsContainer.innerHTML = '<p>Form not found.</p>';
    }

    // Handle accept and reject buttons
    document.getElementById('accept-btn').addEventListener('click', () => {
        updateFormStatus(formIndex, 'Accepted');
    });

    document.getElementById('reject-btn').addEventListener('click', () => {
        openRejectionModal();
    });

    // Handle rejection reason submission
    document.getElementById('submit-reason-btn').addEventListener('click', () => {
        const reason = document.getElementById('rejection-reason').value.trim();
        if (reason) {
            updateFormStatus(formIndex, 'Rejected', reason);
            closeRejectionModal();
        } else {
            alert('Please provide a reason for rejection.');
        }
    });

    // Handle closing the rejection modal
    document.querySelector('.close-btn').addEventListener('click', closeRejectionModal);
});

// Function to update form status in localStorage
function updateFormStatus(index, status, rejectionReason = '') {
    let formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    formSubmissions[index].status = status;
    if (status === 'Rejected') {
        formSubmissions[index].rejectionReason = rejectionReason;
    }
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));

    // Redirect back to the dashboard
    window.location.href = 'dashboard.html';
}

// Function to open the rejection modal
function openRejectionModal() {
    const modal = document.getElementById('rejection-modal');
    modal.style.display = 'block';
}

// Function to close the rejection modal
function closeRejectionModal() {
    const modal = document.getElementById('rejection-modal');
    modal.style.display = 'none';
}

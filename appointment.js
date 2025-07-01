document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Form submission handler
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            instrument: document.getElementById('instrument').value,
            level: document.getElementById('level').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };
        
        // Validate form data
        if (validateForm(formData)) {
            // Show success message
            showMessage('Appointment request submitted successfully! We will contact you shortly.', 'success');
            appointmentForm.reset();
        }
    });
    
    // Form validation
    function validateForm(data) {
        // Name validation
        if (data.name.length < 2) {
            showMessage('Please enter a valid name', 'error');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return false;
        }
        
        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showMessage('Please enter a valid phone number', 'error');
            return false;
        }
        
        // Date validation
        const selectedDate = new Date(data.date);
        if (selectedDate < new Date()) {
            showMessage('Please select a future date', 'error');
            return false;
        }
        
        return true;
    }
    
    // Show message function
    function showMessage(message, type) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        // Add message to form
        appointmentForm.insertBefore(messageElement, appointmentForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Add styles for messages
    const style = document.createElement('style');
    style.textContent = `
        .message {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
            text-align: center;
        }
        .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
});
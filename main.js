// main.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('.submit-button');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('from_name');
        const email = document.getElementById('from_email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const contactNumber = document.getElementById('contact_number');

        // Validate inputs
        if (!validateForm(name, email, subject, message)) return;

        // Disable submit button and show loading state
        setSubmitState(submitButton, 'loading');

        // Generate contact number
        contactNumber.value = Math.floor(100000 + Math.random() * 900000);

        // Send email
        emailjs.sendForm('contact_service_cktukm6', 'contact_form_fh5zerz', this)
            .then(() => {
                setSubmitState(submitButton, 'success');
                contactForm.reset();
                setTimeout(() => setSubmitState(submitButton, 'default'), 3000);
            })
            .catch((error) => {
                console.error('Email send failed:', error);
                setSubmitState(submitButton, 'error');
                setTimeout(() => setSubmitState(submitButton, 'default'), 3000);
            });
    });

    // Form validation function
    function validateForm(name, email, subject, message) {
        const fields = [name, email, subject, message];
        let isValid = true;

        fields.forEach(field => {
            const value = field.value.trim();
            const errorElement = field.nextElementSibling || 
                                 field.parentElement.querySelector('.error-message');

            if (!value) {
                showError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(field);
            }
        });

        return isValid;
    }

    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show error message
    function showError(field, message) {
        // Remove existing error if any
        clearError(field);

        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8em';
        errorElement.textContent = message;

        // Insert error message after the field
        field.parentElement.insertBefore(errorElement, field.nextSibling);
        field.setAttribute('aria-invalid', 'true');
    }

    // Clear error message
    function clearError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.removeAttribute('aria-invalid');
    }

    // Manage submit button state
    function setSubmitState(button, state) {
        switch(state) {
            case 'loading':
                button.disabled = true;
                button.textContent = 'Sending...';
                button.style.opacity = '0.5';
                break;
            case 'success':
                button.textContent = 'Message Sent!';
                button.style.backgroundColor = '#4CAF50';
                break;
            case 'error':
                button.textContent = 'Send Failed';
                button.style.backgroundColor = '#F44336';
                break;
            default:
                button.disabled = false;
                button.textContent = 'Send';
                button.style.opacity = '1';
                button.style.backgroundColor = '#0ef';
        }
    }
});

// Typed.js initialization
var typed = new Typed(".text", {
    strings: ["Marketing Manager", "Events and Communication Specialist"],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1500,
    loop: true
});
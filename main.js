// main.js
var typed = new Typed(".text", {
    strings: ["Marketing Manager", "Events and Communication Specialist"],
    typeSpeed: 80, // Slightly slower
    backSpeed: 60,
    backDelay: 1500, // Pause before retyping
    loop: true
});


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const contactForm = document.getElementById('contact-form');
    

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

    contactForm.addEventListener('submit', () => {
        Event.preventDefault();
    
        const name = document.getElementById('from_name').value.trim();
        const email = document.getElementById('from_email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const contactNumber = document.getElementById('contact_number');
    
        if (!name || !email || !subject || !message) {
            alert("All fields are required.");
            return;
        }
    
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        // Generate a random 6-digit number
        contactNumber.value = Math.floor(100000 + Math.random() * 900000);
        // Increment contact number for each submission
        let currentNumber = parseInt(contactNumber.value);
        contactNumber.value = currentNumber + 1;

        emailjs.sendForm('contact_service_cktukm6', 'contact_form_fh5zerz', this)
            .then(() => {
                alert('Your message is on its way! \n🚀 Thank you for reaching out, Houlda will get back to you soon.');
                this.reset();
                // Regenerate a new random number after successful submission
                contactNumber.value = Math.floor(100000 + Math.random() * 900000);
            }, (error) => {
                alert('Failed to send message. Please try again.');
                console.log('FAILED...', error);
            });
    });
    
});


document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('from_name').value.trim();
    const email = document.getElementById('from_email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert("All fields are required.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Proceed with EmailJS submission...
});

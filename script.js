// Typing Animation
const typingTextElement = document.querySelector(".typed-text");
const cursorElement = document.querySelector(".cursor");

const textArray = [" Web Developer", " UI/UX Designer"];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
    isEnd = false;
    
    // Current text from array
    const currentText = textArray[textArrayIndex];
    
    // If in deleting mode, remove characters one by one
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // If typing, add characters one by one
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Set typing speed
    let typingSpeed = isDeleting ? 80 : 150;
    
    // If completed typing current text
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        isEnd = true;
        typingSpeed = 2000; // Pause before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // If deleted all text, move to next phrase
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before typing again
    }
    
    // Continue the typing effect with the calculated delay
    setTimeout(type, typingSpeed);
}

// Start the typing animation when the page loads
window.addEventListener("load", () => {
    // Only start if the typing element exists
    if (typingTextElement) {
        setTimeout(type, 1000);
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Active navigation highlighting based on scroll
function highlightActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Call the function to initialize
highlightActiveNav(); 
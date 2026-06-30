// Typing Animation
const typingTextElement = document.querySelector(".typed-text");
const cursorElement = document.querySelector(".cursor");

const textArray = [
  " Frontend Developer",
  " React.js Developer",
  " Web Developer",
];
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
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  hamburger.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Form submission with UI alerts and loading states
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Grab the button and save its original text
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // 1. Set Loading UI
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true; // Prevent double clicks

    // Hide any previous status messages
    formStatus.className = "form-status";
    formStatus.style.display = "none";

    try {
      const formData = new FormData(contactForm);

      // 2. Send the Data Quietly
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // 3. Show Success UI
        formStatus.textContent =
          "Message sent successfully! I will get back to you soon.";
        formStatus.classList.add("success");
        contactForm.reset(); // Clear the form fields
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      // 4. Show Error UI
      formStatus.textContent = "Oops! Something went wrong. Please try again.";
      formStatus.classList.add("error");
    } finally {
      // 5. Restore Button State
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;

      // Optional: Auto-hide the success message after 5 seconds
      if (formStatus.classList.contains("success")) {
        setTimeout(() => {
          formStatus.style.display = "none";
          formStatus.classList.remove("success");
        }, 5000);
      }
    }
  });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    // Scroll Down
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // Scroll Up
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Active navigation highlighting based on scroll
function highlightActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

// Call the function to initialize
highlightActiveNav();

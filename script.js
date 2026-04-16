// --- DOM Elements ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksA = document.querySelectorAll('.nav-links a');
const themeIcon = themeToggle.querySelector('i');

// --- Theme Management ---
// Check for saved theme
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    body.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('bx-moon', 'bx-sun');
}

// Toggle Theme
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
});

// --- Sticky Navbar ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Menu Toggle ---
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    if (navLinks.classList.contains('active')) {
        hamburger.innerHTML = "<i class='bx bx-x'></i>";
    } else {
        hamburger.innerHTML = "<i class='bx bx-menu'></i>";
    }
});

// Close mobile menu when a link is clicked
navLinksA.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = "<i class='bx bx-menu'></i>";
    });
});

// --- Scroll Animations ---
// Using IntersectionObserver
const fadeElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animation
            entry.target.classList.add('appear');
            
            // Skill progress bars animation
            if (entry.target.classList.contains('skills')) {
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                progressFills.forEach(fill => {
                    const finalWidth = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = finalWidth;
                    }, 300);
                });
            }
            // Optional: unobserve once appeared
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    scrollObserver.observe(el);
});

// --- Active Nav Link Update on Scroll ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - navbar.clientHeight - 50)) {
            current = section.getAttribute('id');
        }
    });

    navLinksA.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

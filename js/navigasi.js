// Navigation JavaScript - Desktop & Mobile Navigation Functionality

// Mobile Navigation Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenuMobile = document.getElementById('nav-menu-mobile');
let isMenuOpen = false;

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenuToggle.classList.add('active');
        navMenuMobile.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
        mobileMenuToggle.classList.remove('active');
        navMenuMobile.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.nav-menu-mobile .nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Close mobile menu
        isMenuOpen = false;
        mobileMenuToggle.classList.remove('active');
        navMenuMobile.classList.remove('active');
        document.body.style.overflow = '';
        
        // Set active state
        setActiveLink(this);
        
        // Smooth scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = mobileMenuToggle.contains(event.target) || navMenuMobile.contains(event.target);
    
    if (!isClickInsideNav && isMenuOpen) {
        isMenuOpen = false;
        mobileMenuToggle.classList.remove('active');
        navMenuMobile.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Desktop Navigation Smooth Scrolling
const desktopNavLinks = document.querySelectorAll('.navbar-desktop .nav-link');
desktopNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Set active state
        setActiveLink(this);
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Function to set active link
function setActiveLink(clickedLink) {
    // Remove active class from all links
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    clickedLink.classList.add('active');
    
    // Store active state in localStorage for persistence
    const activeHref = clickedLink.getAttribute('href');
    localStorage.setItem('activeNavLink', activeHref);
}

// Function to restore active state from localStorage
function restoreActiveState() {
    const activeHref = localStorage.getItem('activeNavLink');
    if (activeHref) {
        const activeLink = document.querySelector(`.nav-link[href="${activeHref}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Navbar scroll effect
let lastScrollTop = 0;
const navbarDesktop = document.querySelector('.navbar-desktop');
const navbarMobile = document.querySelector('.navbar-mobile');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove shadow based on scroll position
    if (scrollTop > 50) {
        navbarDesktop.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
        navbarMobile.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbarDesktop.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbarMobile.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Active link highlighting based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    // Only update if we have a current section and it's different from stored active
    if (current && current !== localStorage.getItem('activeNavLink')) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                localStorage.setItem('activeNavLink', `#${current}`);
            }
        });
    }
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        // Close mobile menu with Escape key
        isMenuOpen = false;
        mobileMenuToggle.classList.remove('active');
        navMenuMobile.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    updateActiveLink();
}, 100));

// Initialize active state when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set default active state to Beranda if no active state stored
    if (!localStorage.getItem('activeNavLink')) {
        const berandaLink = document.querySelector('.nav-link[href="#beranda"]');
        if (berandaLink) {
            berandaLink.classList.add('active');
            localStorage.setItem('activeNavLink', '#beranda');
        }
    } else {
        // Restore active state from localStorage
        restoreActiveState();
    }
});

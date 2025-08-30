// Main JavaScript - General Functionality

// Inisialisasi AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Preload critical images
function preloadImages() {
    const logoImg = new Image();
    logoImg.src = 'img/logo/Logo.png';
}

// Preload images when page loads
window.addEventListener('load', preloadImages);

// Add loading animation to logo
const logoImg = document.querySelector('.logo-img');
if (logoImg) {
    logoImg.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    // Initial state
    logoImg.style.opacity = '0';
    logoImg.style.transform = 'scale(0.8)';
    logoImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

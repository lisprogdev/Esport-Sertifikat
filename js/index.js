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
    
    // Preload karakter gaming images
    const characterImages = [
        'img/karakter/Claude MLBB.png',
        'img/karakter/Nakoruru HOK.png',
        'img/karakter/Neymar E-Football.png',
        'img/karakter/Pubg Karakter.png',
        'img/karakter/Wukong FF.png'
    ];
    
    characterImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
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

// Character flip card functionality - Auto rotation only
document.addEventListener('DOMContentLoaded', function() {
    const flipInner = document.querySelector('.character-flip-inner');
    
    if (flipInner) {
        let currentIndex = 0;
        const totalCharacters = 5;
        
        // Character flip states
        const flipStates = [
            'flip-front',    // Claude MLBB
            'flip-back',     // Nakoruru HOK
            'flip-right',    // Neymar E-Football
            'flip-left',     // PUBG Character
            'flip-top'       // Wukong FF
        ];
        
        // Function to update flip card
        function updateFlipCard(index) {
            // Remove all flip classes
            flipInner.classList.remove(...flipStates);
            
            // Add current flip class
            flipInner.classList.add(flipStates[index]);
            
            currentIndex = index;
        }
        
        // Next character
        function nextCharacter() {
            currentIndex = (currentIndex + 1) % totalCharacters;
            updateFlipCard(currentIndex);
        }
        
        // Auto-rotate every 5 seconds
        setInterval(nextCharacter, 5000);
        
        // Initialize first character
        updateFlipCard(0);
    }
});

// Smooth scroll to about section when clicking "Tentang Platform" button
document.addEventListener('DOMContentLoaded', function() {
    const tentangBtn = document.querySelector('.btn-primary[href="#tentang"]');
    if (tentangBtn) {
        tentangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#tentang');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Remove parallax effect to prevent sections from overlapping
// window.addEventListener('scroll', function() {
//     const aboutSection = document.querySelector('.about-section');
//     if (aboutSection) {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * -0.5;
//         aboutSection.style.transform = `translateY(${rate}px)`;
//     }
// });

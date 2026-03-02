/**
 * Main Orchestration Script
 * General enhancements and utility functions.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Square Aesthetics Demo Loaded');

    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Performance Note: Debounce scroll events if needed (though we use IntersectionObserver)
    // Performance Note: Lazy load images could be added here
});

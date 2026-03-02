/**
 * Main Orchestration Script
 * General enhancements and utility functions.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Square Aesthetics Demo Loaded');

    // 3. Cinematic Entrance Animations
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));



    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Removed offset for header
                    behavior: 'smooth'
                });
            }
        });
    });


    // 5. Grid/List Toggle Logic
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const featureGrid = document.getElementById('feature-grid');

    if (gridBtn && listBtn && featureGrid) {
        gridBtn.addEventListener('click', () => {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            featureGrid.classList.remove('view-list');
            featureGrid.classList.add('view-grid');
        });

        listBtn.addEventListener('click', () => {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            featureGrid.classList.remove('view-grid');
            featureGrid.classList.add('view-list');
        });
    }

    // 6. Feature Card Hover Effect (Radial Gradient)
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });
    });
});

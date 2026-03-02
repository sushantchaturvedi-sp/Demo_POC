/**
 * Component: Infinite Logo Carousel
 * Seamless loop with clone logic and auto-play controls.
 */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (!track || items.length === 0) return;

    // Clone items for seamless loop
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollAmount = 0;
    const speed = 1; // Pixels per frame
    let isPaused = false;
    let animationId;

    function step() {
        if (!isPaused) {
            scrollAmount -= speed;

            // Check if we've scrolled past the first set of items
            const firstSetWidth = track.scrollWidth / 2;
            if (Math.abs(scrollAmount) >= firstSetWidth) {
                scrollAmount = 0;
            }

            track.style.transform = `translateX(${scrollAmount}px)`;
        }
        animationId = requestAnimationFrame(step);
    }

    // Start auto-play
    animationId = requestAnimationFrame(step);

    // Hover to pause
    track.addEventListener('mouseenter', () => {
        isPaused = true;
        console.log('[Carousel] Paused');
    });

    track.addEventListener('mouseleave', () => {
        isPaused = false;
        console.log('[Carousel] Resumed');
    });

    // Manual controls: jump ahead/back
    nextBtn.addEventListener('click', () => {
        scrollAmount -= 100;
        console.log('[Carousel] Manual Next');
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount += 100;
        if (scrollAmount > 0) scrollAmount = -(track.scrollWidth / 2);
        console.log('[Carousel] Manual Prev');
    });

    console.log('[Carousel] Initialized');
});

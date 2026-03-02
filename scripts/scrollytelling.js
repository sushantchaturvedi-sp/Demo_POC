/**
 * Component: Scrollytelling Product Layout
 * Uses Intersection Observer to sync sticky media with scrolling content layers.
 */

document.addEventListener('DOMContentLoaded', () => {
    const scrollySection = document.querySelector('.scrollytelling-section');
    if (!scrollySection) return;

    const mediaLayers = document.querySelectorAll('.media-layer');
    const contentBlocks = document.querySelectorAll('.content-block');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the block is in view
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                
                // Update active state for content blocks
                contentBlocks.forEach(block => block.classList.remove('active'));
                entry.target.classList.add('active');

                // Update active state for media layers
                mediaLayers.forEach(layer => {
                    if (layer.dataset.content === targetId) {
                        layer.classList.add('active');
                    } else {
                        layer.classList.remove('active');
                    }
                });

                console.log(`[Scrollytelling] Activated: ${targetId}`);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    contentBlocks.forEach(block => observer.observe(block));

    // Handle potential content jump by ensuring container height matches content
    // Note: position: sticky takes care of most of this, but we ensure the track is long enough.
});

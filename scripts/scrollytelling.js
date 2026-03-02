/**
 * Component: Apple-Style Scrollytelling (Vertex Pro)
 * Real-time media transformations synchronized with scroll progress.
 */

document.addEventListener('DOMContentLoaded', () => {
    const scrollySection = document.querySelector('.scrollytelling-section');
    if (!scrollySection) return;

    const mediaLayers = document.querySelectorAll('.media-layer');
    const contentBlocks = document.querySelectorAll('.content-block');
    const stickyMedia = document.querySelector('.sticky-media');

    function updateScrollSync() {
        const sectionRect = scrollySection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;

        // Calculate global progress through the section
        const progress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - viewportHeight)));

        contentBlocks.forEach((block, index) => {
            const blockRect = block.getBoundingClientRect();
            const blockMid = blockRect.top + blockRect.height / 2;
            const threshold = viewportHeight / 2;

            // Activate block and media layer when block is centered
            if (Math.abs(blockMid - threshold) < threshold * 0.5) {
                contentBlocks.forEach(b => b.classList.remove('active'));
                block.classList.add('active');

                mediaLayers.forEach((layer, lIndex) => {
                    layer.classList.toggle('active', lIndex === index);

                    if (lIndex === index) {
                        // Media specific transformations (Apple-style zoom)
                        const blockProgress = Math.max(0, Math.min(1, (threshold - blockRect.top) / blockRect.height));
                        const scale = 1 + (blockProgress * 0.1); // subtle zoom
                        const brightness = 0.5 + (blockProgress * 0.3);
                        layer.style.transform = `scale(${scale})`;
                        layer.style.filter = `brightness(${brightness}) contrast(1.1)`;
                    }
                });
            }
        });

        requestAnimationFrame(updateScrollSync);
    }

    // Startup
    requestAnimationFrame(updateScrollSync);
});

/**
 * Component: Nike-Style State Manager (Vertex Pro)
 * Uses high-speed state transitions and prefetching for instant UI updates.
 */

class VertexProState {
    constructor() {
        this.currentProductId = 'product-1';
        this.products = [];
        this.displayContainer = document.querySelector('.display-content');
        this.loadingOverlay = document.querySelector('.loading-overlay');
        this.init();
    }

    async init() {
        await this.prefetchData();
        this.bindEvents();
        this.renderProduct('product-1'); // Initial render
        setTimeout(() => this.displayContainer.classList.add('loaded'), 100);
    }

    async prefetchData() {
        try {
            const response = await fetch('data/products.json');
            this.products = await response.json();
        } catch (error) {
            console.error('[VertexProState] Prefetch failed:', error);
        }
    }

    bindEvents() {
        document.querySelectorAll('.product-card').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.productId;
                if (id !== this.currentProductId) {
                    this.switchProduct(id);
                }
            });
        });
    }

    switchProduct(id) {
        // High-speed transition (flash and fade)
        this.currentProductId = id;

        // Update active state for buttons
        document.querySelectorAll('.product-card').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.productId === id);
        });

        // Show loader and fade-out content
        this.loadingOverlay.classList.add('active');
        this.displayContainer.classList.remove('loaded');

        // Render new product data (instantly from prefetched storage)
        setTimeout(() => {
            this.renderProduct(id);
            this.displayContainer.classList.add('loaded');
            this.loadingOverlay.classList.remove('active');
        }, 600); // 600ms for visible loader impact
    }

    renderProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        // Apply premium assets (mapping from filenames in images directory)
        const imageMap = {
            'product-1': 'images/product_1.png',
            'product-2': 'images/product_2.png',
            'product-3': 'images/product_3.jpg',
            'product-4': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
        };

        const html = `
            <div class="prod-img-container">
                <img src="${imageMap[id]}" alt="${product.name}">
            </div>
            <div class="prod-info">
                <span class="tagline">PROTOCOL_GEN_01</span>
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <div class="specs">
                    ${product.features.map(f => `
                        <div class="spec-item">
                            <span class="label">${f} <span class="val">${Math.floor(Math.random() * 20 + 80)}%</span></span>
                            <div class="bar-bg"><div class="bar-fill" style="width: ${Math.floor(Math.random() * 20 + 80)}%"></div></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        this.displayContainer.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.vertexState = new VertexProState();
});

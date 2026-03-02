/**
 * Component: AJAX Product Switcher
 * Loads product data from data/products.json using jQuery AJAX.
 * Handles race conditions and shows loading states.
 */

$(document).ready(function () {
    const $display = $('#product-display');
    const $content = $display.find('.display-content');
    const $loading = $display.find('.loading-overlay');
    let isFetching = false;
    let currentProductId = null;

    function loadProduct(productId) {
        if (isFetching && currentProductId === productId) return;

        // Show loading state
        $loading.addClass('active');
        $content.css('opacity', '0.5');
        isFetching = true;
        currentProductId = productId;

        // Simulate network delay for demo purposes
        setTimeout(() => {
            $.ajax({
                url: 'data/products.json',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    const product = data.find(p => p.id === productId);
                    if (product) {
                        renderProduct(product);
                    } else {
                        $content.html('<p>Product not found.</p>');
                    }
                },
                error: function () {
                    $content.html('<p>Error loading product data.</p>');
                },
                complete: function () {
                    $loading.removeClass('active');
                    $content.css('opacity', '1');
                    isFetching = false;
                }
            });
        }, 500); // 500ms delay to see the loading state
    }

    function renderProduct(product) {
        const html = `
            <div class="prod-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="prod-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p>${product.description}</p>
                <ul>
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `;
        $content.html(html);
        console.log(`[Switcher] Loaded: ${product.name}`);
    }

    // Initial load
    loadProduct('product-1');

    // Click handlers
    $('.product-card').on('click', function () {
        const id = $(this).data('product-id');

        $('.product-card').removeClass('active');
        $(this).addClass('active');

        loadProduct(id);
    });
});

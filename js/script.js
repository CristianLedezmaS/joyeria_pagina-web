/**
 * Arena Roja - E-commerce JavaScript
 * Version: 2.0
 * 
 * Professional, modular, and well-structured code.
 */

'use strict';

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    cart: [],
    isLoggedIn: false,
    userEmail: '',
    qrcode: null,
    searchOpen: false,
    mobileMenuOpen: false,
};

// ============================================
// DOM ELEMENTS CACHE
// ============================================
const DOM = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navbarBg: document.getElementById('navbar-bg'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileMenuIcon: document.getElementById('mobile-menu-icon'),
    
    // Search
    searchOverlay: document.getElementById('search-overlay'),
    searchInput: document.getElementById('search-input'),
    searchResults: document.getElementById('search-results'),
    
    // Cart
    cartSidebar: document.getElementById('cart-sidebar'),
    cartBadge: document.getElementById('cart-badge'),
    cartCountText: document.getElementById('cart-count-text'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartTotal: document.getElementById('cart-total'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartFooter: document.getElementById('cart-footer'),
    emptyCartMsg: document.getElementById('empty-cart-msg'),
    btnCheckout: document.getElementById('btn-checkout'),
    
    // Modals
    backdrop: document.getElementById('backdrop'),
    loginModal: document.getElementById('login-modal'),
    checkoutModal: document.getElementById('checkout-modal'),
    voucherModal: document.getElementById('voucher-modal'),
    
    // Checkout
    checkoutForm: document.getElementById('checkout-form'),
    checkoutItemsList: document.getElementById('checkout-items-list'),
    checkoutTotal: document.getElementById('checkout-total'),
    checkoutSubtotal: document.getElementById('checkout-subtotal'),
    checkoutQRContainer: document.getElementById('checkout-qr-container'),
    checkoutQRCode: document.getElementById('checkout-qrcode'),
    
    // Toast
    toastContainer: document.getElementById('toast-container'),
    
    // Back to top
    backToTop: document.getElementById('back-to-top'),
    
    // Products
    productsGrid: document.getElementById('products-grid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    
    // Year
    currentYear: document.getElementById('current-year'),
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollEffects();
    initImageLazyLoading();
    initProductFilters();
    initSearch();
    initBackToTop();
    setCurrentYear();
    initIntersectionObserver();
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    let lastScroll = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > scrollThreshold) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        
        // Hide/Show on scroll direction (optional - uncomment if desired)
        // if (currentScroll > lastScroll && currentScroll > 200) {
        //     DOM.navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     DOM.navbar.style.transform = 'translateY(0)';
        // }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

function toggleMobileMenu() {
    AppState.mobileMenuOpen = !AppState.mobileMenuOpen;
    
    if (AppState.mobileMenuOpen) {
        DOM.mobileMenu.classList.remove('hidden');
        DOM.mobileMenuIcon.classList.replace('fa-bars', 'fa-xmark');
        document.body.classList.add('no-scroll');
    } else {
        DOM.mobileMenu.classList.add('hidden');
        DOM.mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
        document.body.classList.remove('no-scroll');
    }
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
    // Product data for search
    const products = [
        { name: 'Anillo de Sello Imperial', category: 'anillos', price: 350 },
        { name: 'Collar Eslabones Chunky', category: 'collares', price: 420 },
        { name: 'Pendientes Aro Classic', category: 'pendientes', price: 280 },
        { name: 'Anillo Solitario Cristal', category: 'anillos', price: 310 },
        { name: 'Pulsera Cadena Fina', category: 'pulseras', price: 220 },
        { name: 'Collar Gota de Perla', category: 'collares', price: 380 },
    ];
    
    DOM.searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            DOM.searchResults.innerHTML = '';
            return;
        }
        
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
        
        renderSearchResults(filtered);
    });
}

function renderSearchResults(results) {
    if (results.length === 0) {
        DOM.searchResults.innerHTML = `
            <p class="text-center text-gray-400 py-8">
                <i class="fa-solid fa-search text-2xl mb-2 block opacity-30"></i>
                No se encontraron resultados
            </p>
        `;
        return;
    }
    
    DOM.searchResults.innerHTML = results.map(p => `
        <a href="#productos" onclick="toggleSearch()" class="block p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-medium text-sm">${p.name}</h4>
                    <p class="text-xs text-gray-400 capitalize">${p.category}</p>
                </div>
                <span class="text-brand-500 font-semibold">Bs. ${p.price}</span>
            </div>
        </a>
    `).join('');
}

function toggleSearch() {
    AppState.searchOpen = !AppState.searchOpen;
    
    if (AppState.searchOpen) {
        DOM.searchOverlay.classList.remove('hidden');
        DOM.searchInput.focus();
        document.body.classList.add('no-scroll');
    } else {
        DOM.searchOverlay.classList.add('hidden');
        DOM.searchInput.value = '';
        DOM.searchResults.innerHTML = '';
        document.body.classList.remove('no-scroll');
    }
}

// Close search on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (AppState.searchOpen) toggleSearch();
        if (DOM.cartSidebar && !DOM.cartSidebar.classList.contains('translate-x-full')) toggleCart();
    }
});

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER (Animations)
// ============================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// IMAGE LAZY LOADING
// ============================================
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                // Fallback for broken images
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                img.classList.add('loaded');
            });
        }
    });
}

// ============================================
// PRODUCT FILTERS
// ============================================
function initProductFilters() {
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach((product, index) => {
        const productCategory = product.dataset.category;
        const shouldShow = category === 'all' || productCategory === category;
        
        if (shouldShow) {
            product.style.display = 'block';
            product.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.05}s`;
        } else {
            product.style.display = 'none';
        }
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            DOM.backToTop.classList.remove('opacity-0', 'invisible');
            DOM.backToTop.classList.add('opacity-100', 'visible');
        } else {
            DOM.backToTop.classList.add('opacity-0', 'invisible');
            DOM.backToTop.classList.remove('opacity-100', 'visible');
        }
    }, { passive: true });
}

// ============================================
// SET CURRENT YEAR
// ============================================
function setCurrentYear() {
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fa-check',
        error: 'fa-xmark',
        info: 'fa-info',
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${icons[type] || icons.info}"></i>
        </div>
        <div class="flex-1">
            <p class="font-medium text-sm text-gray-800">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Cerrar notificación">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// OVERLAY MANAGEMENT
// ============================================
function closeAllOverlays() {
    DOM.backdrop.classList.add('hidden');
    DOM.cartSidebar.classList.add('translate-x-full');
    DOM.loginModal.classList.add('hidden');
    DOM.checkoutModal.classList.add('hidden');
    DOM.voucherModal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function showBackdrop() {
    DOM.backdrop.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

// ============================================
// CART MANAGEMENT
// ============================================
function toggleCart() {
    if (DOM.cartSidebar.classList.contains('translate-x-full')) {
        closeAllOverlays();
        showBackdrop();
        DOM.cartSidebar.classList.remove('translate-x-full');
    } else {
        closeAllOverlays();
    }
}

function addToCart(name, price, img) {
    const existing = AppState.cart.find(item => item.name === name);
    
    if (existing) {
        existing.qty++;
        showToast(`${name} - cantidad actualizada`, 'info');
    } else {
        AppState.cart.push({ name, price, img, qty: 1 });
        showToast(`${name} añadido al carrito`, 'success');
    }
    
    renderCart();
    
    // Open cart with slight delay for better UX
    setTimeout(() => {
        toggleCart();
    }, 300);
}

function removeFromCart(index) {
    const item = AppState.cart[index];
    AppState.cart.splice(index, 1);
    renderCart();
    showToast(`${item.name} eliminado del carrito`, 'info');
}

function updateQuantity(index, change) {
    const item = AppState.cart[index];
    item.qty += change;
    
    if (item.qty <= 0) {
        removeFromCart(index);
    } else {
        renderCart();
    }
}

function renderCart() {
    const container = DOM.cartItemsContainer;
    const emptyMsg = DOM.emptyCartMsg;
    const footer = DOM.cartFooter;
    
    let total = 0;
    let itemsCount = 0;
    
    // Clear existing items (keep empty message)
    container.innerHTML = '';
    
    if (AppState.cart.length === 0) {
        container.appendChild(emptyMsg);
        emptyMsg.style.display = 'block';
        footer.classList.add('hidden');
        DOM.btnCheckout.disabled = true;
    } else {
        emptyMsg.style.display = 'none';
        footer.classList.remove('hidden');
        DOM.btnCheckout.disabled = false;
        
        AppState.cart.forEach((item, index) => {
            total += item.price * item.qty;
            itemsCount += item.qty;
            
            const itemHTML = `
                <div class="flex gap-4 items-center p-3 bg-gray-50 rounded-lg">
                    <img src="${item.img}" alt="${item.name}" class="w-20 h-24 object-cover rounded-md bg-gray-200">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-sm truncate">${item.name}</h4>
                        <p class="text-brand-500 font-semibold mt-1">Bs. ${item.price}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button onclick="updateQuantity(${index}, -1)" class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-500 transition-colors text-sm">-</button>
                            <span class="text-sm font-medium w-6 text-center">${item.qty}</span>
                            <button onclick="updateQuantity(${index}, 1)" class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-500 transition-colors text-sm">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${index})" class="p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Eliminar ${item.name}">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });
    }
    
    // Update totals
    DOM.cartTotal.textContent = `Bs. ${total}`;
    DOM.cartSubtotal.textContent = `Bs. ${total}`;
    DOM.cartCountText.textContent = itemsCount;
    
    // Update badge
    if (itemsCount > 0) {
        DOM.cartBadge.textContent = itemsCount;
        DOM.cartBadge.classList.remove('opacity-0', 'scale-0');
        DOM.cartBadge.classList.add('opacity-100', 'scale-100');
    } else {
        DOM.cartBadge.classList.add('opacity-0', 'scale-0');
        DOM.cartBadge.classList.remove('opacity-100', 'scale-100');
    }
}

// ============================================
// AUTHENTICATION (SIMULATED)
// ============================================
function iniciarCheckout() {
    closeAllOverlays();
    showBackdrop();
    
    if (!AppState.isLoggedIn) {
        DOM.loginModal.classList.remove('hidden');
        DOM.loginModal.classList.add('flex');
    } else {
        openCheckout();
    }
}

function loginExitoso(provider, event = null) {
    if (event) event.preventDefault();
    
    const form = event?.target;
    const submitBtn = form?.querySelector('button[type="submit"]');
    const originalText = submitBtn?.innerText;
    
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Iniciando sesión...';
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        AppState.isLoggedIn = true;
        
        if (provider === 'google') {
            AppState.userEmail = 'usuario@gmail.com';
        } else if (form) {
            AppState.userEmail = form.querySelector('input[type="email"]').value;
        }
        
        closeAllOverlays();
        showBackdrop();
        openCheckout();
        showToast('¡Sesión iniciada correctamente!', 'success');
        
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1000);
}

// ============================================
// CHECKOUT
// ============================================
function openCheckout() {
    DOM.checkoutModal.classList.remove('hidden');
    
    // Render order summary
    const list = DOM.checkoutItemsList;
    list.innerHTML = '';
    let total = 0;
    
    AppState.cart.forEach(item => {
        total += item.price * item.qty;
        list.insertAdjacentHTML('beforeend', `
            <div class="flex justify-between items-center text-sm">
                <div class="flex items-center gap-3">
                    <img src="${item.img}" alt="" class="w-12 h-14 object-cover rounded bg-gray-200">
                    <div>
                        <p class="font-medium text-gray-800">${item.name}</p>
                        <p class="text-xs text-gray-400">Cant: ${item.qty}</p>
                    </div>
                </div>
                <span class="font-medium">Bs. ${item.price * item.qty}</span>
            </div>
        `);
    });
    
    DOM.checkoutTotal.textContent = `Bs. ${total}`;
    DOM.checkoutSubtotal.textContent = `Bs. ${total}`;
}

function handlePaymentMethod() {
    const method = document.getElementById('c-pago').value;
    
    if (method === 'QR') {
        DOM.checkoutQRContainer.classList.remove('hidden');
        generateQR();
    } else {
        DOM.checkoutQRContainer.classList.add('hidden');
    }
}

function generateQR() {
    DOM.checkoutQRCode.innerHTML = '';
    
    const total = AppState.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const paymentData = `PAGO-ARENAROJA-BS-${total}-${Date.now()}`;
    
    try {
        AppState.qrcode = new QRCode(DOM.checkoutQRCode, {
            text: paymentData,
            width: 160,
            height: 160,
            colorDark: '#0a0a0a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
        });
    } catch (error) {
        console.error('Error generating QR:', error);
        DOM.checkoutQRCode.innerHTML = '<p class="text-red-500 text-sm">Error al generar código QR</p>';
    }
}

// ============================================
// ORDER PROCESSING
// ============================================
DOM.checkoutForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    
    // Loading state
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Procesando...';
    submitBtn.disabled = true;
    
    // Gather form data
    const formData = {
        nombre: document.getElementById('c-nombre').value + ' ' + document.getElementById('c-apellido').value,
        ci: document.getElementById('c-ci').value,
        email: document.getElementById('c-email').value,
        telefono: document.getElementById('c-tel').value,
        entrega: document.getElementById('c-entrega').value,
        pago: document.getElementById('c-pago').value,
        productos: AppState.cart.map(item => ({
            nombre: item.name,
            cantidad: item.qty,
            precio: item.price,
        })),
        total: AppState.cart.reduce((acc, item) => acc + (item.price * item.qty), 0),
        fecha: new Date().toISOString(),
    };
    
    console.log('Order data:', formData);
    
    // Simulate API call
    setTimeout(() => {
        // Fill voucher
        document.getElementById('v-nombre').textContent = formData.nombre;
        document.getElementById('v-ci').textContent = formData.ci;
        document.getElementById('v-entrega').textContent = formData.entrega;
        document.getElementById('v-pago').textContent = formData.pago;
        document.getElementById('v-total').textContent = `Bs. ${formData.total}`;
        
        const voucherList = document.getElementById('v-productos-lista');
        voucherList.innerHTML = '';
        AppState.cart.forEach(item => {
            voucherList.insertAdjacentHTML('beforeend', `<li class="flex justify-between"><span>${item.qty}x ${item.name}</span><span>Bs. ${item.price * item.qty}</span></li>`);
        });
        
        // Show voucher
        closeAllOverlays();
        showBackdrop();
        DOM.voucherModal.classList.remove('hidden');
        DOM.voucherModal.classList.add('flex');
        
        // Reset form
        this.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        
        // TODO: Send to Google Sheets or backend
        // sendToBackend(formData);
        
    }, 1500);
});

function imprimirVoucher() {
    const printContent = document.getElementById('voucher-print-area').innerHTML;
    
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Comprobante - Arena Roja</title>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'DM Sans', sans-serif; padding: 30px; color: #333; }
                .text-center { text-align: center; }
                .font-display { font-family: 'Cormorant Garamond', serif; }
                .mb-2 { margin-bottom: 8px; }
                .mb-4 { margin-bottom: 16px; }
                .mb-6 { margin-bottom: 24px; }
                .mt-4 { margin-top: 16px; }
                .pt-4 { padding-top: 16px; }
                .pb-3 { padding-bottom: 12px; }
                .text-sm { font-size: 14px; }
                .text-xs { font-size: 12px; }
                .font-semibold { font-weight: 600; }
                .border-b { border-bottom: 1px solid #e5e7eb; }
                .space-y > * + * { margin-top: 8px; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                .gap-2 { gap: 8px; }
                .bg-gray-50 { background: #f9fafb; padding: 16px; border-radius: 4px; }
                .text-brand-500 { color: #D4AF37; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>
            ${printContent}
            <script>
                window.onload = function() { 
                    window.print(); 
                    window.onafterprint = function() { window.close(); }
                }
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function finalizarCompra() {
    // Reset state
    AppState.cart = [];
    AppState.isLoggedIn = false;
    AppState.userEmail = '';
    
    // Close everything and reload
    closeAllOverlays();
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('¡Gracias por tu compra! Pronto recibirás un correo de confirmación.', 'success', 6000);
}

// ============================================
// NEWSLETTER
// ============================================
function handleNewsletter(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showToast('¡Gracias por suscribirte! Revisa tu correo para tu código de descuento.', 'success');
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // TODO: Send to newsletter service
        // subscribeToNewsletter(email);
    }, 1000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-VE', {
        style: 'currency',
        currency: 'VES',
        minimumFractionDigits: 0,
    }).format(amount);
}

function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CONSOLE BRANDING
// ============================================
console.log(
    '%c✦ Arena Roja %c v2.0 ',
    'background: #D4AF37; color: white; padding: 8px 12px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #0a0a0a; color: #D4AF37; padding: 8px 12px; border-radius: 0 4px 4px 0;'
);
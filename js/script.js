/**
 * Arena Roja - E-commerce v3.0
 * SPA con vistas, login Google real, voucher PDF y historial de compras.
 */
'use strict';

// ============================================
// CONFIG
// ============================================
const CONFIG = {
    SHOP_EMAIL: 'ventas@arenaroja.com',
    WHATSAPP: '584121234567',
};

// ============================================
// FIREBASE (cuentas reales)
// ============================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD8dMNi_yHBboHTSXN4C78vfbv1MgcSnsw",
    authDomain: "arena-roja-7f8a0.firebaseapp.com",
    projectId: "arena-roja-7f8a0",
    storageBucket: "arena-roja-7f8a0.firebasestorage.app",
    messagingSenderId: "232537914131",
    appId: "1:232537914131:web:386f7aefdf0bb8dd6d38e6",
    measurementId: "G-14Z00JVH7K"
};
if (typeof firebase !== 'undefined') firebase.initializeApp(FIREBASE_CONFIG);

// ============================================
// PRODUCTOS (fuente única de verdad)
// ============================================
const PRODUCTS = [
    { id: 1, name: 'Anillo de Sello Imperial', category: 'anillos', price: 350, oldPrice: 420, img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: 'Nuevo', rating: 5, reviews: 128 },
    { id: 2, name: 'Collar Eslabones Chunky', category: 'collares', price: 420, oldPrice: 525, img: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: '-20%', rating: 4, reviews: 89 },
    { id: 3, name: 'Pendientes Aro Classic', category: 'pendientes', price: 280, oldPrice: null, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 5, reviews: 256 },
    { id: 4, name: 'Anillo Solitario Cristal', category: 'anillos', price: 310, oldPrice: null, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 4, reviews: 167 },
    { id: 5, name: 'Pulsera Cadena Fina', category: 'pulseras', price: 220, oldPrice: 280, img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 5, reviews: 312 },
    { id: 6, name: 'Collar Gota de Perla', category: 'collares', price: 380, oldPrice: null, img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: 'Más Vendido', rating: 5, reviews: 421 },
    { id: 7, name: 'Pendientes Lágrima Elegantes', category: 'pendientes', price: 340, oldPrice: null, img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 5, reviews: 198 },
    { id: 8, name: 'Anillo Zafiro Nocturno', category: 'anillos', price: 520, oldPrice: 650, img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: 'Edición Limitada', rating: 5, reviews: 76 },
    { id: 9, name: 'Collar Corazón Adornado', category: 'collares', price: 460, oldPrice: 540, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 4, reviews: 143 },
    { id: 10, name: 'Pulsera Serpiente Dorada', category: 'pulseras', price: 490, oldPrice: null, img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: 'Nuevo', rating: 5, reviews: 234 },
    { id: 11, name: 'Anillo Corona Reina', category: 'anillos', price: 580, oldPrice: 720, img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 5, reviews: 54 },
    { id: 12, name: 'Collar Regalo Eterno', category: 'collares', price: 410, oldPrice: null, img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', badge: null, rating: 4, reviews: 167 },
];

const imgSmall = (url) => url.replace('w=600', 'w=150');

// ============================================
// ESTADO
// ============================================
const AppState = {
    cart: loadCart(),
    user: loadUser(),
    currentView: 'inicio',
    rNumber: 1000 + Math.floor(Math.random() * 9000),
};

// Persistencia
function loadCart() {
    try { return JSON.parse(localStorage.getItem('arenaroja_cart')) || []; }
    catch { return []; }
}
function saveCart() { localStorage.setItem('arenaroja_cart', JSON.stringify(AppState.cart)); }
function loadUser() {
    try { return JSON.parse(localStorage.getItem('arenaroja_user')) || null; }
    catch { return null; }
}
function saveUser() {
    if (AppState.user) localStorage.setItem('arenaroja_user', JSON.stringify(AppState.user));
    else localStorage.removeItem('arenaroja_user');
}
function loadHistory() {
    try { return JSON.parse(localStorage.getItem(historyKey())) || []; }
    catch { return []; }
}
function saveHistory(history) { localStorage.setItem(historyKey(), JSON.stringify(history)); }
function historyKey() {
    return (AppState.user && AppState.user.uid) ? 'arenaroja_history_' + AppState.user.uid : 'arenaroja_history';
}

// ============================================
// DOM REFS
// ============================================
const $ = (id) => document.getElementById(id);

// ============================================
// ROUTER (Vistas)
// ============================================
function goTo(view) {
    AppState.currentView = view;
    document.querySelectorAll('.page-view').forEach(v => v.classList.add('hidden'));
    $('view-' + view).classList.remove('hidden');
    
    // Active nav state
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('text-brand-500'));
    document.querySelector(`.nav-item[data-page="${view}"]`)?.classList.add('text-brand-500');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-animar productos al entrar a colección
    if (view === 'coleccion') animateProducts();
}

// ============================================
// RENDER PRODUCTOS
// ============================================
function renderProducts(filter = 'all') {
    const grid = $('products-grid');
    if (!grid) return;
    
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map((p, i) => {
        const badgeClass = p.badge === '-20%' ? 'bg-brand-wine' : p.badge === 'Más Vendido' ? 'bg-brand-500' : 'bg-brand-dark';
        const badge = p.badge ? `<span class="${badgeClass} text-white text-[10px] font-semibold px-3 py-1 uppercase tracking-wider rounded-full">${p.badge}</span>` : '';
        const old = p.oldPrice ? `<span class="text-xs text-gray-400 line-through">Bs. ${p.oldPrice}</span>` : '';
        let stars = '';
        for (let s = 1; s <= 5; s++) {
            if (s <= p.rating) stars += '<i class="fa-solid fa-star text-brand-500 text-xs"></i>';
            else if (s - 0.5 <= p.rating) stars += '<i class="fa-solid fa-star-half-stroke text-brand-500 text-xs"></i>';
            else stars += '<i class="fa-regular fa-star text-brand-500 text-xs"></i>';
        }
        return `
            <article class="product-card group" data-id="${p.id}">
                <div class="relative overflow-hidden aspect-[3/4] mb-5 bg-gray-100 rounded-sm">
                    <img src="${p.img}" alt="${p.name} - Arena Roja" class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'">
                    ${badge ? `<div class="absolute top-4 left-4 flex flex-col gap-2">${badge}</div>` : ''}
                    <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button onclick="addToCart(${p.id})" class="w-full bg-white/95 backdrop-blur text-brand-dark py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors duration-300">
                            <i class="fa-solid fa-plus mr-2"></i>Añadir al Carrito
                        </button>
                    </div>
                </div>
                <div class="px-1">
                    <h3 class="font-display text-lg lg:text-xl font-medium group-hover:text-brand-500 transition-colors">${p.name}</h3>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-brand-500 font-semibold">Bs. ${p.price}</span>
                        ${old}
                    </div>
                    <div class="flex items-center gap-1 mt-3">
                        ${stars}
                        <span class="text-xs text-gray-400 ml-1">(${p.reviews})</span>
                    </div>
                </div>
            </article>`;
    }).join('');
}

function animateProducts() {
    requestAnimationFrame(() => {
        document.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.animation = `none`;
            card.offsetHeight;
            card.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.05}s`;
        });
    });
}

// Filtros
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
            animateProducts();
        });
    });
}

// ============================================
// NAVBAR / SCROLL
// ============================================
function initNavbar() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) $('navbar').classList.add('scrolled');
        else $('navbar').classList.remove('scrolled');
        
        if (window.pageYOffset > 500) {
            $('back-to-top').classList.remove('opacity-0', 'invisible');
            $('back-to-top').classList.add('opacity-100', 'visible');
        } else {
            $('back-to-top').classList.add('opacity-0', 'invisible');
            $('back-to-top').classList.remove('opacity-100', 'visible');
        }
    }, { passive: true });
    $('current-year').textContent = new Date().getFullYear();
}

function toggleMobileMenu() {
    const menu = $('mobile-menu');
    const icon = $('mobile-menu-icon');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.replace('fa-bars', 'fa-xmark');
        document.body.classList.add('no-scroll');
    } else {
        menu.classList.add('hidden');
        icon.classList.replace('fa-xmark', 'fa-bars');
        document.body.classList.remove('no-scroll');
    }
}

// ============================================
// TOASTS
// ============================================
function showToast(message, type = 'success', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: 'fa-check', error: 'fa-xmark', info: 'fa-info' };
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${icons[type] || icons.info}"></i></div>
        <div class="flex-1"><p class="font-medium text-sm text-gray-800">${message}</p></div>
        <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>`;
    $('toast-container').appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); toast.classList.add('hide'); setTimeout(() => toast.remove(), 300); }, duration);
}

// ============================================
// OVERLAYS
// ============================================
function showModal(el) { if (!el) return; el.style.display = 'flex'; el.classList.remove('hidden'); el.classList.add('flex'); }
function hideModal(el) { if (!el) return; el.style.display = 'none'; el.classList.add('hidden'); el.classList.remove('flex'); }

function closeAllOverlays() {
    hideModal($('backdrop'));
    $('cart-sidebar')?.classList.add('translate-x-full');
    hideModal($('login-modal'));
    hideModal($('checkout-modal'));
    hideModal($('voucher-modal'));
    hideModal($('history-modal'));
    document.body.classList.remove('no-scroll');
}

function showBackdrop() { showModal($('backdrop')); document.body.classList.add('no-scroll'); }

// ============================================
// CARRITO
// ============================================
function toggleCart() {
    if ($('cart-sidebar').classList.contains('translate-x-full')) {
        closeAllOverlays();
        showBackdrop();
        $('cart-sidebar').classList.remove('translate-x-full');
    } else {
        closeAllOverlays();
    }
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const existing = AppState.cart.find(i => i.id === productId);
    if (existing) existing.qty++;
    else AppState.cart.push({ id: product.id, name: product.name, price: product.price, img: imgSmall(product.img), qty: 1 });
    saveCart();
    renderCart();
    showToast(`${product.name} añadido al carrito`, 'success');
}

function removeFromCart(index) {
    const item = AppState.cart[index];
    AppState.cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast(`${item.name} eliminado`, 'info');
}

function updateQuantity(index, change) {
    const item = AppState.cart[index];
    item.qty += change;
    if (item.qty <= 0) { AppState.cart.splice(index, 1); }
    saveCart();
    renderCart();
}

function renderCart() {
    const container = $('cart-items-container');
    const footer = $('cart-footer');
    let total = 0, itemsCount = 0;
    
    if (AppState.cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-400 mt-16">
                <i class="fa-solid fa-bag-shopping text-5xl mb-4 opacity-20"></i>
                <p class="font-display text-xl">Tu carrito está vacío</p>
                <p class="text-sm mt-2">Explora nuestra colección y encuentra algo que te encante.</p>
                <button onclick="toggleCart();goTo('coleccion')" class="mt-6 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors underline underline-offset-4">Ver Colección →</button>
            </div>`;
        footer.classList.add('hidden');
        $('btn-checkout').disabled = true;
    } else {
        container.innerHTML = AppState.cart.map((item, i) => {
            total += item.price * item.qty;
            itemsCount += item.qty;
            return `
                <div class="flex gap-4 items-center p-3 bg-gray-50 rounded-lg">
                    <img src="${item.img}" alt="${item.name}" class="w-20 h-24 object-cover rounded-md bg-gray-200">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-sm truncate">${item.name}</h4>
                        <p class="text-brand-500 font-semibold mt-1">Bs. ${item.price}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button onclick="updateQuantity(${i}, -1)" class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-500 transition-colors text-sm">-</button>
                            <span class="text-sm font-medium w-6 text-center">${item.qty}</span>
                            <button onclick="updateQuantity(${i}, 1)" class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-500 transition-colors text-sm">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${i})" class="p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Eliminar"><i class="fa-regular fa-trash-can"></i></button>
                </div>`;
        }).join('');
        footer.classList.remove('hidden');
        $('btn-checkout').disabled = false;
    }
    
    $('cart-total').textContent = `Bs. ${total}`;
    $('cart-subtotal').textContent = `Bs. ${total}`;
    $('cart-count-text').textContent = itemsCount;
    
    const badge = $('cart-badge');
    if (itemsCount > 0) { badge.textContent = itemsCount; badge.classList.remove('opacity-0', 'scale-0'); badge.classList.add('opacity-100', 'scale-100'); }
    else { badge.classList.add('opacity-0', 'scale-0'); badge.classList.remove('opacity-100', 'scale-100'); }
}

// ============================================
// AUTH - FIREBASE (cuentas reales)
// ============================================
let accountMode = 'login'; // 'login' | 'register'

function toggleLoginModal() {
    if (AppState.user) {
        showToast(`Sesión activa: ${AppState.user.email}`, 'info');
        return;
    }
    closeAllOverlays();
    showBackdrop();
    showModal($('login-modal'));
}

// Alternar entre "Iniciar sesión" y "Registrarse"
function toggleAccountMode() {
    accountMode = accountMode === 'login' ? 'register' : 'login';
    const registering = accountMode === 'register';
    $('field-nombre-row').classList.toggle('hidden', !registering);
    $('field-pass2-row').classList.toggle('hidden', !registering);
    $('login-mode-text').textContent = registering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?';
    $('login-toggle-btn').textContent = registering ? 'Inicia sesión' : 'Regístrate';
    $('login-submit-btn').textContent = registering ? 'Crear Cuenta' : 'Iniciar Sesión';
    $('login-title').textContent = registering ? 'Crear tu cuenta' : 'Bienvenido';
    $('login-subtitle').textContent = registering ? 'Regístrate y guarda tu historial de compras' : 'Inicia sesión para finalizar tu compra';
    $('login-error').classList.add('hidden');
}

function showLoginError(msg) {
    const el = $('login-error');
    el.textContent = msg;
    el.classList.remove('hidden');
}

function setLoginLoading(loading) {
    const btn = $('login-submit-btn');
    btn.disabled = loading;
    btn.innerHTML = loading
        ? '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Procesando...'
        : (accountMode === 'register' ? 'Crear Cuenta' : 'Iniciar Sesión');
}

function setGoogleLoading(loading) {
    const btn = $('google-login-btn');
    btn.disabled = loading;
    btn.innerHTML = loading ? '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Conectando con Google...' : `
        <svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
        <span class="font-medium text-sm">Continuar con Google</span>`;
}

function handleGoogleLogin() {
    if (typeof firebase === 'undefined') { showToast('Firebase no cargó. Revisa tu conexión.', 'error'); return; }
    setGoogleLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((res) => {
            const u = res.user;
            completeLogin({ uid: u.uid, name: u.displayName || 'Cliente', email: u.email || '', picture: u.photoURL || '', provider: 'google' });
        })
        .catch((err) => {
            setGoogleLoading(false);
            if (err.code === 'auth/popup-blocked') showToast('El navegador bloqueó la ventana de Google. Permite popups e inténtalo de nuevo.', 'error', 6000);
            else if (err.code !== 'auth/popup-closed-by-user') showToast(firebaseErrorMsg(err), 'error', 6000);
        });
}

// Registrar / Iniciar sesión con correo y contraseña
function loginConCorreo(event) {
    event.preventDefault();
    if (typeof firebase === 'undefined') { showToast('Firebase no cargó. Revisa tu conexión.', 'error'); return; }
    const email = $('login-email').value.trim();
    const pass = $('login-pass').value;
    const registering = accountMode === 'register';
    const name = registering ? $('login-nombre').value.trim() : '';
    $('login-error').classList.add('hidden');

    if (!email || !pass) return;
    if (registering && !name) { showLoginError('Escribe tu nombre completo'); return; }
    if (registering && pass.length < 6) { showLoginError('La contraseña debe tener al menos 6 caracteres'); return; }
    if (registering && pass !== $('login-pass2').value) { showLoginError('Las contraseñas no coinciden'); return; }

    setLoginLoading(true);

    const finish = (fbUser) => completeLogin({
        uid: fbUser.uid,
        name: registering && name ? name : (fbUser.displayName || email.split('@')[0]),
        email: fbUser.email || email,
        picture: fbUser.photoURL || '',
        provider: registering ? 'email' : 'email-return',
    });

    if (registering) {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((res) => {
                res.user.updateProfile({ displayName: name }).catch(() => {});
                finish(res.user);
            })
            .catch((err) => { setLoginLoading(false); showLoginError(firebaseErrorMsg(err)); });
    } else {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((res) => finish(res.user))
            .catch((err) => { setLoginLoading(false); showLoginError(firebaseErrorMsg(err)); });
    }
}

function resetPassword() {
    if (typeof firebase === 'undefined') return;
    const email = $('login-email').value.trim();
    if (!email) { showLoginError('Escribe tu correo para recuperar la contraseña'); return; }
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => showToast('Te enviamos un enlace para restablecer tu contraseña', 'success', 5000))
        .catch((err) => { showLoginError(firebaseErrorMsg(err)); });
}

function firebaseErrorMsg(err) {
    const map = {
        'auth/email-already-in-use': 'Este correo ya está registrado. Inicia sesión.',
        'auth/invalid-email': 'El correo no es válido.',
        'auth/user-not-found': 'No hay cuenta con este correo. Regístrate.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/too-many-requests': 'Demasiados intentos. Espera un momento y vuelve a intentarlo.',
        'auth/network-request-failed': 'Error de conexión. Revisa tu internet y reintenta.',
        'auth/popup-blocked': 'Popup bloqueado. Permite ventanas emergentes para Google.',
        'auth/operation-not-supported-in-this-environment': 'Habilita Google en Firebase: Authentication → Sign-in method.',
        'auth/configuration-not-found': 'Revisa la configuración de Firebase (projectId).',
    };
    return map[err.code] || (err && err.message) || 'Ocurrió un error. Inténtalo de nuevo.';
}

function completeLogin(user) {
    if (!user.uid) user.uid = 'user_' + Date.now();
    AppState.user = user;
    saveUser();
    updateUserUI();
    closeAllOverlays();
    showToast(`¡Bienvenido, ${user.name.split(' ')[0]}!`, 'success');
    
    // Si venía del checkout, continuar
    if (AppState.cart.length > 0) {
        setTimeout(() => { showBackdrop(); openCheckout(); }, 600);
    }
}

function logoutUser() {
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
        firebase.auth().signOut().catch(() => {});
    }
    AppState.user = null;
    saveUser();
    updateUserUI();
    closeAllOverlays();
    showToast('Sesión cerrada', 'info');
}

function updateUserUI() {
    const badge = $('user-badge');
    if (AppState.user) {
        badge.classList.remove('hidden');
        badge.textContent = AppState.user.name.slice(0, 1).toUpperCase();
        badge.className = 'w-6 h-6 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center absolute -top-1 -right-1';
    } else {
        badge.classList.add('hidden');
        badge.className = 'hidden';
    }
}

// ============================================
// CHECKOUT
// ============================================
function iniciarCheckout() {
    closeAllOverlays();
    showBackdrop();
    if (!AppState.user) {
        showModal($('login-modal'));
        showToast('Inicia sesión para continuar con tu compra', 'info', 3500);
    } else {
        openCheckout();
    }
}

function openCheckout() {
    showModal($('checkout-modal'));
    // Pre-llenar nombre/email
    if (AppState.user) {
        $('c-nombre').value = AppState.user.name.split(' ')[0] || '';
        $('c-apellido').value = AppState.user.name.split(' ').slice(1).join(' ') || '';
    }
    const list = $('checkout-items-list');
    list.innerHTML = '';
    let total = 0;
    AppState.cart.forEach(item => {
        total += item.price * item.qty;
        list.insertAdjacentHTML('beforeend', `
            <div class="flex justify-between items-center text-sm">
                <div class="flex items-center gap-3">
                    <img src="${item.img}" alt="" class="w-12 h-14 object-cover rounded bg-gray-200">
                    <div><p class="font-medium text-gray-800">${item.name}</p><p class="text-xs text-gray-400">Cant: ${item.qty}</p></div>
                </div>
                <span class="font-medium">Bs. ${item.price * item.qty}</span>
            </div>`);
    });
    $('checkout-total').textContent = `Bs. ${total}`;
}

function handlePaymentMethod() {
    if ($('c-pago').value === 'QR') {
        $('checkout-qr-container').classList.remove('hidden');
        generateQR();
    } else {
        $('checkout-qr-container').classList.add('hidden');
    }
}

function generateQR() {
    const qrDiv = $('checkout-qrcode');
    qrDiv.innerHTML = '';
    // Fijar dimensiones explícitas (qrcodejs usa position:absolute y deja el padre con altura 0)
    qrDiv.style.cssText = 'position:relative;width:160px;height:160px;margin:0 auto;';
    const total = AppState.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const paymentData = `PAGO-ARENAROJA-BS-${total}-${Date.now()}`;
    if (typeof QRCode !== 'undefined') {
        new QRCode(qrDiv, { text: paymentData, width: 160, height: 160, colorDark: '#0a0a0a', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
    }
}

// ============================================
// PROCESAR COMPRA
// ============================================
$('checkout-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Procesando...';
    submitBtn.disabled = true;

    const order = {
        numero: 'AR-' + (AppState.rNumber++),
        fecha: new Date().toLocaleString('es-VE'),
        nombre: $('c-nombre').value + ' ' + $('c-apellido').value,
        ci: $('c-ci').value,
        telefono: $('c-tel').value,
        email: AppState.user ? AppState.user.email : '',
        entrega: $('c-entrega').value,
        pago: $('c-pago').value,
        items: AppState.cart.map(i => ({ nombre: i.name, cantidad: i.qty, precio: i.price, total: i.price * i.qty })),
        total: AppState.cart.reduce((a, i) => a + (i.price * i.qty), 0),
    };

    setTimeout(() => {
        // Guardar en historial
        const history = loadHistory();
        history.unshift(order);
        saveHistory(history);

        // Llenar voucher
        $('v-nombre').textContent = order.nombre;
        $('v-ci').textContent = order.ci;
        $('v-entrega').textContent = order.entrega;
        $('v-pago').textContent = order.pago;
        $('v-email').textContent = order.email;
        $('v-numero').textContent = order.numero;
        $('v-total').textContent = `Bs. ${order.total}`;

        const list = $('v-productos-lista');
        list.innerHTML = '';
        order.items.forEach(it => {
            list.insertAdjacentHTML('beforeend', `<li class="flex justify-between"><span>${it.cantidad}x ${it.nombre}</span><span>Bs. ${it.total}</span></li>`);
        });

        closeAllOverlays();
        showBackdrop();
        showModal($('voucher-modal'));
        this.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    }, 1500);
});

// ============================================
// VOUCHER: PDF, CORREO, IMPRESIÓN
// ============================================
function downloadVoucherPDF() {
    const area = $('voucher-print-area');
    showToast('Generando PDF...', 'info', 2000);
    
    // clonamos para estilo limpio
    html2canvas(area, { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a5');
        const imgW = 148;
        const imgH = (canvas.height * imgW) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgW, imgH);
        pdf.save(`Comprobante-${$('v-numero').textContent}.pdf`);
        showToast('Comprobante descargado en PDF', 'success');
    }).catch(() => {
        showToast('No se pudo generar el PDF', 'error');
        imprimirVoucher();
    });
}

function sendVoucherEmail() {
    const email = AppState.user ? AppState.user.email : $('v-email').textContent;
    if (!email) { showToast('No hay correo para envío', 'error'); return; }
    
    // Modo simulado (usa localStorage como "bandeja de envío")
    const outbox = JSON.parse(localStorage.getItem('arenaroja_outbox')) || [];
    outbox.push({
        to: email,
        asunto: `Tu comprobante de compra ${$('v-numero').textContent} - Arena Roja`,
        fecha: new Date().toISOString(),
        pedido: $('v-numero').textContent,
    });
    localStorage.setItem('arenaroja_outbox', JSON.stringify(outbox));
    
    showToast(`Comprobante enviado al correo: ${email}`, 'success', 5000);
}

function imprimirVoucher() {
    const printContent = $('voucher-print-area').innerHTML;
    const win = window.open('', '_blank', 'width=400,height=600');
    win.document.write(`
        <!DOCTYPE html><html><head><title>Comprobante - Arena Roja</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
        <style>
            *{box-sizing:border-box;margin:0;padding:0}
            body{font-family:'DM Sans',sans-serif;padding:30px;color:#333;text-align:center}
            .font-display{font-family:'Cormorant Garamond',serif}
            .text-left{text-align:left}.flex{display:flex}.justify-between{justify-content:space-between}
            .text-sm{font-size:14px}.text-xs{font-size:12px}.mb-2{margin-bottom:8px}.mb-4{margin-bottom:16px}.mb-6{margin-bottom:24px}.mb-8{margin-bottom:32px}
            .bg-gray-50{background:#f9fafb;padding:16px;border-radius:4px}.border-b{border-bottom:1px solid #e5e7eb}.pb-3{padding-bottom:12px}.space-y > * + *{margin-top:8px}
            img{width:80px;height:80px;border-radius:50%;background:#d1fae5;color:#10b981;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
            @media print{body{padding:20px}}
        </style></head><body>${printContent}
        <script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script>
        </body></html>`);
    win.document.close();
}

function finalizarCompra() {
    AppState.cart = [];
    saveCart();
    closeAllOverlays();
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('¡Gracias por tu compra! Revisa tu correo y el historial.', 'success', 6000);
}

// ============================================
// HISTORIAL DE COMPRAS
// ============================================
function openHistory() {
    closeAllOverlays();
    showBackdrop();
    showModal($('history-modal'));
    
    const content = $('history-content');
    const history = loadHistory();
    
    if (!AppState.user) {
        content.innerHTML = `
            <div class="text-center text-gray-400 py-16">
                <i class="fa-solid fa-user-lock text-5xl mb-4 opacity-20"></i>
                <p class="font-display text-xl">Inicia sesión</p>
                <p class="text-sm mt-2 mb-6">Para ver tu historial de compras necesitas iniciar sesión.</p>
                <button onclick="closeAllOverlays();toggleLoginModal()" class="inline-block bg-brand-dark text-white px-8 py-3 font-semibold hover:bg-brand-500 transition-colors text-sm">Iniciar Sesión</button>
            </div>`;
        return;
    }
    
    if (history.length === 0) {
        content.innerHTML = `
            <div class="text-center text-gray-400 py-16">
                <i class="fa-solid fa-clock-rotate-left text-5xl mb-4 opacity-20"></i>
                <p class="font-display text-xl">Aún no tienes compras</p>
                <p class="text-sm mt-2 mb-6">Cuando hagas una compra, aparecerá aquí con su comprobante.</p>
                <button onclick="closeAllOverlays();goTo('coleccion')" class="inline-block bg-brand-500 text-white px-8 py-3 font-semibold hover:bg-brand-600 transition-colors text-sm">Explorar Colección</button>
            </div>`;
        return;
    }
    
    content.innerHTML = `
        <div class="text-center mb-6 pb-6 border-b border-gray-100">
            <div class="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center text-white font-display text-2xl font-semibold mx-auto mb-3">
                ${AppState.user.name.slice(0, 1).toUpperCase()}
            </div>
            <h3 class="font-display text-xl">${AppState.user.name}</h3>
            <p class="text-xs text-gray-400">${AppState.user.email}</p>
            <button onclick="logoutUser()" class="mt-3 text-xs text-red-500 hover:underline">Cerrar sesión</button>
        </div>
        ${history.map((o, idx) => `
            <div class="border border-gray-100 rounded-lg p-4 mb-4 hover:shadow-sm transition-shadow">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <p class="font-semibold text-sm">${o.numero}</p>
                        <p class="text-xs text-gray-400">${o.fecha}</p>
                    </div>
                    <span class="font-display text-lg font-bold text-brand-500">Bs. ${o.total}</span>
                </div>
                <ul class="text-xs text-gray-600 space-y-1 mb-3">
                    ${o.items.map(i => `<li class="flex justify-between"><span>${i.cantidad}x ${i.nombre}</span><span>Bs. ${i.total}</span></li>`).join('')}
                </ul>
                <div class="flex justify-between text-[10px] text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-2">
                    <span>Entrega: ${o.entrega}</span>
                    <span>Pago: ${o.pago}</span>
                </div>
            </div>`).join('')}`;
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initFilters();
    initNavbar();
    updateUserUI();
    renderCart();

    // Restaurar sesión real desde Firebase
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                AppState.user = {
                    uid: user.uid,
                    name: user.displayName || (user.email || '').split('@')[0],
                    email: user.email || '',
                    picture: user.photoURL || '',
                    provider: 'firebase',
                };
                saveUser();
                updateUserUI();
            } else {
                AppState.user = null;
                saveUser();
                updateUserUI();
            }
        });
    }
});
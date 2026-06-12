let cart = [];

function loadCart() {
  const saved = localStorage.getItem('sbl_cart');
  if (saved) {
    cart = JSON.parse(saved);
  }
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('sbl_cart', JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = cart.length;
  }
}

function addCart(id, name, price) {
  cart.push({ id, name, price });
  saveCart();
  updateCartCount();
  showToast('✦ Added to cart!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 2500);
}

function escapeHtml(str) {
  if(!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    return m;
  });
}

loadCart();

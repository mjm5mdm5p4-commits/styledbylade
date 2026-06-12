let cart = JSON.parse(localStorage.getItem('sbl_cart')) || [];

function saveCart() {
    localStorage.setItem('sbl_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = cart.length;
}

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    saveCart();
    updateCartCount();
    alert(`${name} added to cart!`);
}

function renderCart() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #eee;">
                <div>${item.name}</div>
                <div>₦${item.price.toLocaleString()} 
                    <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; font-size:1.2rem; margin-left:10px;">×</button>
                </div>
            </div>`;
    });

    container.innerHTML = html || '<p style="text-align:center; padding:2rem;">Your cart is empty</p>';
    const totalEl = document.getElementById('total');
    if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
}

function clearCart() {
    if (confirm('Clear entire cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
    }
}

function showDeliveryForm() {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }
    document.getElementById('customerDetails').style.display = 'block';
    window.scrollTo({ top: document.getElementById('customerDetails').offsetTop - 100, behavior: 'smooth' });
}

function proceedToWhatsApp() {
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const address = document.getElementById('address').value.trim();
    const notes = document.getElementById('notes').value.trim();

    if (!name || !phone || !address) {
        alert("Please fill in all required fields (*)");
        return;
    }

    let msg = `Hi StyledByLade,%0A%0A*New Order*%0A`;
    msg += `Full Name: ${encodeURIComponent(name)}%0A`;
    msg += `Phone: ${encodeURIComponent(phone)}%0A`;
    msg += `Delivery Address: ${encodeURIComponent(address)}%0A`;

    if (notes) msg += `Notes: ${encodeURIComponent(notes)}%0A`;

    msg += `%0A*Items:*%0A`;
    cart.forEach(item => {
        msg += `- ${item.name} - ₦${item.price}%0A`;
    });

    msg += `%0A*Total:* ₦${cart.reduce((sum, i) => sum + i.price, 0)}`;

    window.open(`https://wa.me/2348064905466?text=${msg}`, '_blank');

    // Optional: Clear cart after successful send
    // if (confirm("Order sent! Clear cart?")) clearCart();
}

// cart.js - handles cart functionality

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
});

// Mock product data (same as in other files)
const products = {
  1: {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    imageUrl: 'https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg',
  },
  2: {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    imageUrl: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
  },
  3: {
    id: 3,
    name: 'DSLR Camera',
    price: 499.99,
    imageUrl: 'https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg',
  }
};

function loadCart() {
  const cartContentContainer = document.getElementById('cart-content');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContentContainer.innerHTML = `
      <div class="text-center py-5">
        <h3>Your cart is empty</h3>
        <p class="text-muted">Add some products to get started!</p>
        <a href="index.html" class="btn btn-primary">Continue Shopping</a>
      </div>
    `;
    return;
  }

  renderCart(cart);
}

function renderCart(cart) {
  const cartContentContainer = document.getElementById('cart-content');
  let total = 0;

  const cartItemsHtml = cart.map(item => {
    const product = products[item.productId];
    if (!product) return '';

    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    return `
      <div class="row border-bottom py-3" id="cart-item-${item.productId}">
        <div class="col-md-2">
          <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}">
        </div>
        <div class="col-md-4">
          <h5>${product.name}</h5>
          <p class="text-muted">$${product.price.toFixed(2)} each</p>
        </div>
        <div class="col-md-3">
          <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
            <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="updateQuantity(${item.productId}, this.value)">
            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <div class="col-md-2">
          <p class="fw-bold">$${itemTotal.toFixed(2)}</p>
        </div>
        <div class="col-md-1">
          <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.productId})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  cartContentContainer.innerHTML = `
    <div class="row">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Cart Items</h5>
          </div>
          <div class="card-body">
            ${cartItemsHtml}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Order Summary</h5>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Tax:</span>
              <span>$${(total * 0.08).toFixed(2)}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <strong>$${(total + 10 + (total * 0.08)).toFixed(2)}</strong>
            </div>
            <div class="d-grid gap-2">
              <a href="order-summary.html" class="btn btn-primary btn-lg">Proceed to Checkout</a>
              <a href="index.html" class="btn btn-outline-secondary">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateQuantity(productId, newQuantity) {
  newQuantity = parseInt(newQuantity);
  
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart to update display
    showAlert('Cart updated successfully!', 'success');
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart(); // Reload cart to update display
  showAlert('Item removed from cart!', 'info');
}

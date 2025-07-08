// order-summary.js - handles order summary and checkout functionality

document.addEventListener('DOMContentLoaded', () => {
  loadOrderSummary();
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

function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    document.getElementById('order-items').innerHTML = `
      <div class="text-center py-3">
        <p>No items in cart. <a href="index.html">Continue shopping</a></p>
      </div>
    `;
    document.getElementById('order-total').innerHTML = `
      <p>No items to checkout</p>
    `;
    return;
  }

  renderOrderItems(cart);
  renderOrderTotal(cart);
}

function renderOrderItems(cart) {
  const orderItemsContainer = document.getElementById('order-items');
  
  const itemsHtml = cart.map(item => {
    const product = products[item.productId];
    if (!product) return '';

    const itemTotal = product.price * item.quantity;

    return `
      <div class="row border-bottom py-2">
        <div class="col-2">
          <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}">
        </div>
        <div class="col-6">
          <h6>${product.name}</h6>
          <small class="text-muted">Quantity: ${item.quantity}</small>
        </div>
        <div class="col-4 text-end">
          <span class="fw-bold">$${itemTotal.toFixed(2)}</span>
        </div>
      </div>
    `;
  }).join('');

  orderItemsContainer.innerHTML = itemsHtml;
}

function renderOrderTotal(cart) {
  const orderTotalContainer = document.getElementById('order-total');
  
  let subtotal = 0;
  cart.forEach(item => {
    const product = products[item.productId];
    if (product) {
      subtotal += product.price * item.quantity;
    }
  });

  const shipping = 10.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  orderTotalContainer.innerHTML = `
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal:</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Shipping:</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Tax (8%):</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <hr>
    <div class="d-flex justify-content-between">
      <strong>Total:</strong>
      <strong>$${total.toFixed(2)}</strong>
    </div>
  `;
}

function placeOrder() {
  // Validate shipping form
  const form = document.getElementById('shipping-form');
  const formData = new FormData(form);
  
  // Check if all required fields are filled
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
  let isValid = true;
  
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });

  if (!isValid) {
    showAlert('Please fill in all required fields.', 'danger');
    return;
  }

  // Validate email format
  const email = document.getElementById('email').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email').classList.add('is-invalid');
    showAlert('Please enter a valid email address.', 'danger');
    return;
  }

  // Get cart data
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    showAlert('Your cart is empty.', 'warning');
    return;
  }

  // Prepare order data
  const orderData = {
    orderId: generateOrderId(),
    items: cart,
    shippingInfo: {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zipCode: document.getElementById('zipCode').value
    },
    orderDate: new Date().toISOString(),
    status: 'confirmed'
  };

  // Simulate API call to place order
  try {
    // In a real application, this would be an API call:
    // const response = await fetch('http://localhost:8080/api/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderData)
    // });

    // For demo purposes, save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show success message and redirect
    showAlert('Order placed successfully! Order ID: ' + orderData.orderId, 'success');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);

  } catch (error) {
    showAlert('Failed to place order. Please try again.', 'danger');
  }
}

function generateOrderId() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

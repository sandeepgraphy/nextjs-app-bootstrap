// product.js - handles fetching and rendering product details

document.addEventListener('DOMContentLoaded', () => {
  fetchProductDetails();
});

async function fetchProductDetails() {
  const productDetailsContainer = document.getElementById('product-details');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    productDetailsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning" role="alert">
          No product ID specified. <a href="index.html">Return to home</a>
        </div>
      </div>
    `;
    return;
  }

  try {
    // For now, using mock data. Replace URL with actual backend API endpoint.
    // const response = await fetch(`http://localhost:8080/api/products/${productId}`);
    // const product = await response.json();

    // Mock product data
    const products = {
      1: {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need crystal clear audio quality. Features include 30-hour battery life, quick charge capability, and premium comfort padding.',
        price: 99.99,
        imageUrl: 'https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg',
        features: ['Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Wireless Connectivity']
      },
      2: {
        id: 2,
        name: 'Smart Watch',
        description: 'Smart watch with fitness tracking and notifications. Stay connected and monitor your health with this advanced wearable technology. Includes heart rate monitoring, GPS tracking, and smartphone integration.',
        price: 149.99,
        imageUrl: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
        features: ['Fitness Tracking', 'Heart Rate Monitor', 'GPS', 'Smartphone Integration']
      },
      3: {
        id: 3,
        name: 'DSLR Camera',
        description: 'Capture stunning photos with this DSLR camera. Professional-grade camera perfect for photography enthusiasts and professionals. Features high-resolution sensor, multiple shooting modes, and excellent low-light performance.',
        price: 499.99,
        imageUrl: 'https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg',
        features: ['High Resolution', 'Multiple Shooting Modes', 'Low Light Performance', 'Professional Grade']
      }
    };

    const product = products[productId];

    if (!product) {
      productDetailsContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            Product not found. <a href="index.html">Return to home</a>
          </div>
        </div>
      `;
      return;
    }

    renderProductDetails(product);
  } catch (error) {
    productDetailsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          Failed to load product details. Please try again later. <a href="index.html">Return to home</a>
        </div>
      </div>
    `;
  }
}

function renderProductDetails(product) {
  const productDetailsContainer = document.getElementById('product-details');
  
  productDetailsContainer.innerHTML = `
    <div class="col-md-6">
      <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}">
    </div>
    <div class="col-md-6">
      <h1>${product.name}</h1>
      <p class="lead">${product.description}</p>
      <h3 class="text-primary">$${product.price.toFixed(2)}</h3>
      
      <h5 class="mt-4">Features:</h5>
      <ul class="list-group list-group-flush mb-4">
        ${product.features.map(feature => `<li class="list-group-item">${feature}</li>`).join('')}
      </ul>
      
      <div class="d-grid gap-2 d-md-flex">
        <button class="btn btn-primary btn-lg me-md-2" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
        <a href="index.html" class="btn btn-outline-secondary btn-lg">
          Back to Products
        </a>
      </div>
    </div>
  `;
}

function addToCart(productId) {
  // Get existing cart from localStorage or create new one
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      addedAt: new Date().toISOString()
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Show success message
  showAlert('Product added to cart successfully!', 'success');
}

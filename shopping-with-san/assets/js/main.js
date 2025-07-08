// main.js - handles fetching and rendering product list for Home page

document.addEventListener('DOMContentLoaded', () => {
  fetchProductList();
});

async function fetchProductList() {
  const productListContainer = document.getElementById('product-list');
  productListContainer.innerHTML = '<p>Loading products...</p>';

  try {
    // For now, using mock data. Replace URL with actual backend API endpoint.
    // const response = await fetch('http://localhost:8080/api/products');
    // const products = await response.json();

    // Mock product data
    const products = [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High quality wireless headphones with noise cancellation.',
        price: 99.99,
        imageUrl: 'https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg',
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Smart watch with fitness tracking and notifications.',
        price: 149.99,
        imageUrl: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
      },
      {
        id: 3,
        name: 'DSLR Camera',
        description: 'Capture stunning photos with this DSLR camera.',
        price: 499.99,
        imageUrl: 'https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg',
      },
    ];

    renderProductList(products);
  } catch (error) {
    productListContainer.innerHTML = '';
    showAlert('Failed to load products. Please try again later.', 'danger');
  }
}

function renderProductList(products) {
  const productListContainer = document.getElementById('product-list');
  productListContainer.innerHTML = '';

  products.forEach((product) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.className = 'card-img-top';
    img.alt = product.name;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = product.name;

    const desc = document.createElement('p');
    desc.className = 'card-text';
    desc.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'card-text fw-bold mt-auto';
    price.textContent = `$${product.price.toFixed(2)}`;

    const detailsBtn = document.createElement('a');
    detailsBtn.className = 'btn btn-primary mt-2';
    detailsBtn.href = `product.html?id=${product.id}`;
    detailsBtn.textContent = 'View Details';

    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(price);
    cardBody.appendChild(detailsBtn);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    productListContainer.appendChild(col);
  });
}

// Utility function to show alerts (requires helper.js)
function showAlert(message, type = 'info') {
  const alertPlaceholder = document.createElement('div');
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.body.prepend(alertPlaceholder);
}

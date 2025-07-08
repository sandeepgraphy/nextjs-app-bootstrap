 # Shopping with San - Mini E-Commerce Platform

A modern, responsive e-commerce frontend built with HTML, CSS, JavaScript, and Bootstrap. This project demonstrates a complete shopping experience with product catalog, cart management, checkout process, and user authentication.

## 🌟 Features

- **Product Catalog**: Browse products with attractive images and detailed information
- **Product Details**: View detailed product information with features and specifications
- **Shopping Cart**: Add, update, and remove items from cart with real-time total calculation
- **Checkout Process**: Complete order placement with shipping information form
- **User Authentication**: Login and registration system with form validation
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Local Storage**: Cart and user data persistence using browser local storage

## 📁 Project Structure

```
shopping-with-san/
├── index.html              # Home page with product catalog
├── product.html            # Product details page
├── cart.html               # Shopping cart page
├── order-summary.html      # Checkout and order summary page
├── login.html              # User login page
├── signup.html             # User registration page
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS styles
│   └── js/
│       ├── main.js         # Home page functionality
│       ├── product.js      # Product details functionality
│       ├── cart.js         # Cart management functionality
│       ├── order-summary.js # Checkout functionality
│       ├── auth.js         # Authentication functionality
│       └── helper.js       # Utility functions
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone or download the project files**
   ```bash
   git clone <repository-url>
   cd shopping-with-san
   ```

2. **Serve the files using a local web server**

   **Option 1: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Using Node.js (if installed)**
   ```bash
   npx http-server -p 8000
   ```

   **Option 3: Using VS Code Live Server extension**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open your browser and navigate to:**
   ```
   http://localhost:8000
   ```

## 📱 Pages Overview

### 1. Home Page (`index.html`)
- Displays product catalog in a responsive grid layout
- Product cards with images, names, descriptions, and prices
- "View Details" buttons linking to individual product pages

### 2. Product Details (`product.html`)
- Detailed product information with large images
- Product features list
- "Add to Cart" functionality
- Navigation back to product catalog

### 3. Shopping Cart (`cart.html`)
- List of items added to cart
- Quantity update and item removal functionality
- Order summary with subtotal, shipping, tax, and total
- "Proceed to Checkout" button

### 4. Order Summary (`order-summary.html`)
- Review of order items
- Shipping information form with validation
- Order total calculation
- "Place Order" functionality

### 5. Login (`login.html`)
- User authentication form
- Email and password validation
- "Remember me" option
- Link to registration page

### 6. Sign Up (`signup.html`)
- User registration form with comprehensive validation
- Password confirmation
- Terms and conditions agreement
- Link to login page

## 🛠️ Technical Features

### Frontend Technologies
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Custom styling with responsive design
- **JavaScript (ES6+)**: Modern JavaScript features and DOM manipulation
- **Bootstrap 5**: Responsive framework for UI components

### Key Functionalities
- **Local Storage**: Persistent cart and user data
- **Form Validation**: Client-side validation with error handling
- **Responsive Design**: Mobile-first approach with Bootstrap grid system
- **Error Handling**: User-friendly error messages and alerts
- **Mock Data**: Simulated product and user data for demonstration

### Data Management
- **Products**: Mock product data with images from Pexels
- **Cart**: Local storage-based cart management
- **Users**: Local storage-based user registration and authentication
- **Orders**: Order history stored in local storage

## 🎨 Design Features

- **Modern UI**: Clean, professional design with Bootstrap components
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Attractive Images**: High-quality product images from Pexels
- **Consistent Branding**: "Shopping with San" branding throughout
- **User-Friendly Navigation**: Intuitive navigation with active page indicators

## 🔧 Customization

### Adding New Products
Edit the `products` object in the JavaScript files to add new products:

```javascript
const products = {
  4: {
    id: 4,
    name: 'New Product',
    description: 'Product description',
    price: 199.99,
    imageUrl: 'https://images.pexels.com/photos/example.jpeg',
    features: ['Feature 1', 'Feature 2']
  }
};
```

### Styling Customization
Modify `assets/css/style.css` to customize:
- Colors and branding
- Typography and fonts
- Layout and spacing
- Component styling

### Backend Integration
To connect with a real backend:

1. Replace mock data with actual API calls
2. Update API endpoints in JavaScript files
3. Implement proper authentication with JWT tokens
4. Add error handling for network requests

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 Future Enhancements

- **Search Functionality**: Product search and filtering
- **Product Categories**: Category-based product organization
- **User Profiles**: User account management and order history
- **Payment Integration**: Real payment gateway integration
- **Admin Panel**: Product and order management interface
- **Reviews and Ratings**: Customer review system
- **Wishlist**: Save products for later functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please contact:
- Email: support@shoppingwithsan.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/shopping-with-san/issues)

---

**Shopping with San** - Your trusted e-commerce platform! 🛍️

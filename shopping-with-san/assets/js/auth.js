// auth.js - handles login and signup functionality

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
    
    // Add real-time password confirmation validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (password && confirmPassword) {
      confirmPassword.addEventListener('input', validatePasswordMatch);
    }
  }
});

async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Basic validation
  if (!email || !password) {
    showAlert('Please fill in all required fields.', 'danger');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email').classList.add('is-invalid');
    showAlert('Please enter a valid email address.', 'danger');
    return;
  }

  try {
    // In a real application, this would be an API call:
    // const response = await fetch('http://localhost:8080/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });

    // For demo purposes, check against localStorage users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Simulate successful login
      const authToken = 'mock-jwt-token-' + Date.now();
      
      if (rememberMe) {
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        sessionStorage.setItem('authToken', authToken);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }

      showAlert('Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      showAlert('Invalid email or password.', 'danger');
    }
  } catch (error) {
    showAlert('Login failed. Please try again.', 'danger');
  }
}

async function handleSignup(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  // Reset validation states
  document.querySelectorAll('.form-control').forEach(input => {
    input.classList.remove('is-invalid');
  });

  let isValid = true;

  // Validate required fields
  const requiredFields = [
    { id: 'username', value: username },
    { id: 'email', value: email },
    { id: 'password', value: password },
    { id: 'confirmPassword', value: confirmPassword },
    { id: 'firstName', value: firstName },
    { id: 'lastName', value: lastName }
  ];

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      document.getElementById(field.id).classList.add('is-invalid');
      isValid = false;
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email').classList.add('is-invalid');
    isValid = false;
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById('password').classList.add('is-invalid');
    isValid = false;
  }

  // Password confirmation validation
  if (password !== confirmPassword) {
    document.getElementById('confirmPassword').classList.add('is-invalid');
    isValid = false;
  }

  // Terms agreement validation
  if (!agreeTerms) {
    document.getElementById('agreeTerms').classList.add('is-invalid');
    isValid = false;
  }

  if (!isValid) {
    showAlert('Please correct the errors in the form.', 'danger');
    return;
  }

  try {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email || u.username === username);

    if (existingUser) {
      if (existingUser.email === email) {
        document.getElementById('email').classList.add('is-invalid');
        showAlert('An account with this email already exists.', 'danger');
      } else {
        document.getElementById('username').classList.add('is-invalid');
        showAlert('This username is already taken.', 'danger');
      }
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      username,
      email,
      password, // In a real app, this would be hashed
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showAlert('Account created successfully! Redirecting to login...', 'success');
    
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);

  } catch (error) {
    showAlert('Registration failed. Please try again.', 'danger');
  }
}

function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const confirmPasswordField = document.getElementById('confirmPassword');

  if (confirmPassword && password !== confirmPassword) {
    confirmPasswordField.classList.add('is-invalid');
  } else {
    confirmPasswordField.classList.remove('is-invalid');
  }
}

// Utility function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Utility function to get current user
function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

// Utility function to logout
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

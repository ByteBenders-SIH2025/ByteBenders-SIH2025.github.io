// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const loginBtn = document.getElementById('loginBtn');
const btnLoader = document.getElementById('btnLoader');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Form validation rules
const validationRules = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    password: {
        required: true,
        minLength: 6,
        message: 'Password must be at least 6 characters long'
    }
};

// Utility functions
const showError = (element, message) => {
    element.textContent = message;
    element.style.opacity = '1';
};

const hideError = (element) => {
    element.textContent = '';
    element.style.opacity = '0';
};

const setInputState = (input, state) => {
    input.classList.remove('success', 'error');
    if (state) {
        input.classList.add(state);
    }
};

const validateEmail = (email) => {
    const rule = validationRules.email;
    if (!email) {
        if (rule.required) {
            showError(emailError, 'Email is required');
            setInputState(emailInput, 'error');
            return false;
        }
        return true;
    }
    
    if (!rule.pattern.test(email)) {
        showError(emailError, rule.message);
        setInputState(emailInput, 'error');
        return false;
    }
    
    hideError(emailError);
    setInputState(emailInput, 'success');
    return true;
};

const validatePassword = (password) => {
    const rule = validationRules.password;
    if (!password) {
        if (rule.required) {
            showError(passwordError, 'Password is required');
            setInputState(passwordInput, 'error');
            return false;
        }
        return true;
    }
    
    if (password.length < rule.minLength) {
        showError(passwordError, rule.message);
        setInputState(passwordInput, 'error');
        return false;
    }
    
    hideError(passwordError);
    setInputState(passwordInput, 'success');
    return true;
};

const validateForm = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    return isEmailValid && isPasswordValid;
};

// Password visibility toggle
passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = passwordToggle.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Real-time validation
emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    if (email) {
        validateEmail(email);
    } else {
        hideError(emailError);
        setInputState(emailInput, null);
    }
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    if (password) {
        validatePassword(password);
    } else {
        hideError(passwordError);
        setInputState(passwordInput, null);
    }
});

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    btnLoader.classList.add('show');
    
    // Simulate API call
    try {
        const userData = await simulateLogin(emailInput.value.trim(), passwordInput.value);
        
        // Success - redirect or show success message
        showSuccessMessage(userData);
        
    } catch (error) {
        // Handle login error
        showErrorMessage(error.message);
    } finally {
        // Hide loading state
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        btnLoader.classList.remove('show');
    }
});

// Simulate login API call
const simulateLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different scenarios
            if (email === 'admin@school.com' && password === 'password123') {
                resolve({ success: true, user: { name: 'Admin User', role: 'Administrator' } });
            } else if (email === 'teacher@school.com' && password === 'teacher123') {
                resolve({ success: true, user: { name: 'Teacher User', role: 'Teacher' } });
            } else if (email === 'student@school.com' && password === 'student123') {
                resolve({ success: true, user: { name: 'Student User', role: 'Student' } });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 2000); // 2 second delay to show loading
    });
};

// Success message
const showSuccessMessage = (userData) => {
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Login successful! Redirecting to dashboard...</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Redirect to dashboard after delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
    
    // Remove notification
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Error message
const showErrorMessage = (message) => {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification
    setTimeout(() => {
        notification.remove();
    }, 5000);
};

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList.contains('google-btn') ? 'Google' : 'Microsoft';
        
        // Show loading state
        const originalText = btn.innerHTML;
        btn.innerHTML = `
            <div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.1); border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            Connecting to ${provider}...
        `;
        btn.disabled = true;
        
        // Simulate social login
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            showSuccessMessage();
        }, 2000);
    });
});

// Remember me functionality
rememberMeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        // Store credentials in localStorage (in real app, use secure storage)
        localStorage.setItem('rememberedEmail', emailInput.value);
        console.log('Credentials will be remembered');
    } else {
        localStorage.removeItem('rememberedEmail');
        console.log('Credentials will not be remembered');
    }
});

// Load remembered email on page load
window.addEventListener('load', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Focus management
emailInput.addEventListener('focus', () => {
    emailInput.parentElement.style.transform = 'scale(1.02)';
});

emailInput.addEventListener('blur', () => {
    emailInput.parentElement.style.transform = 'scale(1)';
});

passwordInput.addEventListener('focus', () => {
    passwordInput.parentElement.style.transform = 'scale(1.02)';
});

passwordInput.addEventListener('blur', () => {
    passwordInput.parentElement.style.transform = 'scale(1)';
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification-content i {
        font-size: 18px;
    }
    
    .input-container {
        transition: transform 0.2s ease;
    }
    
    .social-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Demo credentials display
const demoCredentials = document.createElement('div');
demoCredentials.innerHTML = `
    <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 16px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1000;
        max-width: 300px;
    ">
        <strong>Demo Credentials:</strong><br>
        Admin: admin@school.com / password123<br>
        Teacher: teacher@school.com / teacher123<br>
        Student: student@school.com / student123
    </div>
`;
document.body.appendChild(demoCredentials);

// Auto-hide demo credentials after 10 seconds
setTimeout(() => {
    demoCredentials.style.opacity = '0';
    demoCredentials.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        demoCredentials.remove();
    }, 500);
}, 10000);

console.log('EduConnect Login System Initialized');
console.log('Available demo accounts:');
console.log('- Admin: admin@school.com / password123');
console.log('- Teacher: teacher@school.com / teacher123');
console.log('- Student: student@school.com / student123');


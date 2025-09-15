// Dashboard JavaScript Functionality

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const notificationBtn = document.getElementById('notificationBtn');
const notificationPanel = document.getElementById('notificationPanel');
const closeNotifications = document.getElementById('closeNotifications');
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenuDropdown = document.getElementById('userMenuDropdown');
const overlay = document.getElementById('overlay');
const logoutBtn = document.getElementById('logoutBtn');

// Chart instance
let attendanceChart = null;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeCharts();
    initializeEventListeners();
    loadDashboardData();
});

// Initialize Dashboard
function initializeDashboard() {
    console.log('EduConnect Dashboard Initialized');
    
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        redirectToLogin();
        return;
    }
    
    // Update user info in sidebar
    updateUserInfo(user);
    
    // Set active navigation
    setActiveNavigation();
    
    // Initialize tooltips and interactions
    initializeTooltips();
}

// Get current user from localStorage
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Update user info in sidebar
function updateUserInfo(user) {
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');
    const userAvatar = document.querySelector('.user-avatar img');
    const headerUserAvatar = document.querySelector('.user-menu-btn img');
    
    if (userName) userName.textContent = user.name || 'Admin User';
    if (userRole) userRole.textContent = user.role || 'Administrator';
    
    // Update avatars with user initials
    const initials = getUserInitials(user.name || 'Admin User');
    if (userAvatar) {
        userAvatar.src = `img/logodefault.jpeg?text=${initials}`;
        userAvatar.alt = user.name || 'Admin User';
    }
    if (headerUserAvatar) {
        headerUserAvatar.src = `img/logodefault.jpeg?text=${initials}`;
        headerUserAvatar.alt = user.name || 'Admin User';
    }
}

// Get user initials
function getUserInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
}

// Set active navigation
function setActiveNavigation() {
    const currentPath = window.location.hash || '#dashboard';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
}

// Initialize Charts
function initializeCharts() {
    initializeAttendanceChart();
}

// Initialize Attendance Chart
function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;
    
    const attendanceData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Attendance %',
            data: [92, 88, 95, 90, 94, 89, 91],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    };
    
    const config = {
        type: 'line',
        data: attendanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#2563eb'
                }
            }
        }
    };
    
    attendanceChart = new Chart(ctx, config);
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Notification panel
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotificationPanel);
    }
    
    if (closeNotifications) {
        closeNotifications.addEventListener('click', closeNotificationPanel);
    }
    
    // User menu dropdown
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', toggleUserMenu);
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Overlay click
    if (overlay) {
        overlay.addEventListener('click', closeAllPanels);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', handleQuickAction);
    });
    
    // Chart controls
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', handleChartControl);
    });
    
    // Close panels on escape key
    document.addEventListener('keydown', handleKeyDown);
    
    // Close panels when clicking outside
    document.addEventListener('click', handleOutsideClick);
}

// Toggle Sidebar
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.classList.toggle('overflow-hidden');
}

// Toggle Notification Panel
function toggleNotificationPanel() {
    notificationPanel.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.classList.toggle('overflow-hidden');
}

// Close Notification Panel
function closeNotificationPanel() {
    notificationPanel.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('overflow-hidden');
}

// Toggle User Menu
function toggleUserMenu(e) {
    e.stopPropagation();
    userMenuDropdown.classList.toggle('open');
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedEmail');
        
        // Show logout message
        showNotification('Logged out successfully', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Handle Navigation
function handleNavigation(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Check if it's an external link (not a hash link)
    if (href.startsWith('http') || href.endsWith('.html')) {
        // Let the browser handle external links normally
        return;
    }
    
    // Only prevent default for hash links
    e.preventDefault();
    
    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.parentElement.classList.add('active');
    
    // Update URL
    window.location.hash = href;
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('overflow-hidden');
    }
    
    // Handle different routes
    handleRoute(href);
}

// Handle Route
function handleRoute(route) {
    switch(route) {
        case '#dashboard':
            loadDashboardData();
            break;
        default:
            loadDashboardData();
    }
}

// Handle Quick Action
function handleQuickAction(e) {
    e.preventDefault();
    const action = e.currentTarget.querySelector('span').textContent;
    
    switch(action) {
        case 'Add Student':
            // Navigate to students page and trigger add modal
            window.location.href = 'students.html#add';
            break;
        case 'Add Teacher':
            // Navigate to teachers page and trigger add modal
            window.location.href = 'teachers.html#add';
            break;
        case 'Schedule Class':
            // Navigate to schedule page
            window.location.href = 'schedule.html';
            break;
        case 'Generate Report':
            // Navigate to reports page
            window.location.href = 'reports.html';
            break;
        case 'Send Notification':
            // Open notification modal
            openNotificationModal();
            break;
        case 'System Settings':
            // Navigate to settings page
            window.location.href = 'settings.html';
            break;
        default:
            showNotification('Feature coming soon!', 'info');
    }
}

// Open Notification Modal
function openNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('overlay').classList.add('show');
        document.body.classList.add('modal-open');
    }
}

// Close Notification Modal
function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.remove('show');
        document.getElementById('overlay').classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

// Send Notification
function sendNotification() {
    const form = document.getElementById('notificationForm');
    const formData = new FormData(form);
    const notificationData = Object.fromEntries(formData);
    
    // Validate form
    if (!notificationData.title || !notificationData.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate sending notification
    showNotification('Notification sent successfully!', 'success');
    closeNotificationModal();
    form.reset();
}

// Handle Chart Control
function handleChartControl(e) {
    e.preventDefault();
    
    // Remove active class from all buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    e.currentTarget.classList.add('active');
    
    // Update chart based on selected period
    const period = e.currentTarget.textContent.toLowerCase();
    updateAttendanceChart(period);
}

// Update Attendance Chart
function updateAttendanceChart(period) {
    if (!attendanceChart) return;
    
    let newData;
    let newLabels;
    
    switch(period) {
        case 'week':
            newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            newData = [92, 88, 95, 90, 94, 89, 91];
            break;
        case 'month':
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            newData = [89, 92, 87, 94];
            break;
        case 'year':
            newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            newData = [91, 88, 93, 90, 92, 89];
            break;
        default:
            return;
    }
    
    attendanceChart.data.labels = newLabels;
    attendanceChart.data.datasets[0].data = newData;
    attendanceChart.update('active');
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading data
    console.log('Loading dashboard data...');
    
    // Update stats with animation
    animateStats();
    
    // Load recent activities
    loadRecentActivities();
    
    // Load upcoming events
    loadUpcomingEvents();
    
    // Load top students
    loadTopStudents();
}

// Animate Stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(stat, 0, numericValue, 1000, finalValue);
        }
    });
}

// Animate Number
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        element.textContent = Math.round(current) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Load Recent Activities
function loadRecentActivities() {
    // This would typically fetch from an API
    console.log('Loading recent activities...');
}

// Load Upcoming Events
function loadUpcomingEvents() {
    // This would typically fetch from an API
    console.log('Loading upcoming events...');
}

// Load Top Students
function loadTopStudents() {
    // This would typically fetch from an API
    console.log('Loading top students...');
}

// Initialize Tooltips
function initializeTooltips() {
    // Add tooltip functionality to various elements
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Show Tooltip
function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
        position: absolute;
        background: var(--gray-900);
        color: var(--white);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    e.target._tooltip = tooltip;
}

// Hide Tooltip
function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        e.target._tooltip = null;
    }
}

// Handle Key Down
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        closeAllPanels();
    }
}

// Handle Outside Click
function handleOutsideClick(e) {
    // Close user menu if clicking outside
    if (userMenuDropdown && !userMenuBtn.contains(e.target) && !userMenuDropdown.contains(e.target)) {
        userMenuDropdown.classList.remove('open');
    }
}

// Close All Panels
function closeAllPanels() {
    sidebar.classList.remove('open');
    notificationPanel.classList.remove('open');
    userMenuDropdown.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('overflow-hidden');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-message">
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        min-width: 250px;
        width: fit-content;
    `;
    
    // Add to notification container
    const container = document.getElementById('notificationContainer');
    if (container) {
        container.appendChild(notification);
    } else {
        document.body.appendChild(notification);
    }
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Get Notification Icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Redirect to Login
function redirectToLogin() {
    window.location.href = 'index.html';
}

// Load sidebar state from localStorage
window.addEventListener('load', function() {
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('overflow-hidden');
    }
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }
    
    .notification-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 2px;
    }
    
    .notification-icon i {
        font-size: 14px;
        color: white;
    }
    
    .notification-message {
        flex: 1;
        min-width: 0;
    }
    
    .notification-message span {
        line-height: 1.4;
        font-size: 14px;
        font-weight: 500;
        display: block;
        word-wrap: break-word;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.15s ease;
        flex-shrink: 0;
        margin-left: 8px;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
    
    .notification-close i {
        font-size: 12px;
    }
    
    .overflow-hidden {
        overflow: hidden;
    }
    
    /* Modal Styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .close-btn {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.375rem;
        transition: all 0.15s ease;
    }
    
    .close-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1.5rem;
        border-top: 1px solid #e5e7eb;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        transition: all 0.15s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        font-size: 0.875rem;
        color: #374151;
    }
    
    .checkbox-label input[type="checkbox"] {
        margin: 0;
        width: 1.25rem;
        height: 1.25rem;
    }
    
    .modal-open {
        overflow: hidden;
    }
    
    /* Notification Container */
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: row;
        gap: 12px;
        max-width: calc(100vw - 40px);
        overflow-x: auto;
        pointer-events: none;
        align-items: flex-start;
        padding: 8px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 12px;
        backdrop-filter: blur(10px);
    }
    
    .notification-container .notification {
        pointer-events: auto;
        position: relative;
        top: auto;
        right: auto;
        margin: 0;
        flex-shrink: 0;
    }
`;
document.head.appendChild(style);

console.log('Dashboard JavaScript loaded successfully');

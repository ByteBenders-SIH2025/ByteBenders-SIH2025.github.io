// Settings Management JavaScript

// Utility Functions
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function redirectToLogin() {
    window.location.href = 'index.html';
}

function setActiveNavigation() {
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('.nav-link');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sample users data
const usersData = [
    {
        id: 'USR001',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@school.edu',
        role: 'admin',
        status: 'Active',
        lastLogin: '2023-12-15T10:30:00Z',
        avatar: 'https://via.placeholder.com/40x40/2563eb/ffffff?text=JS'
    },
    {
        id: 'USR002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@school.edu',
        role: 'teacher',
        status: 'Active',
        lastLogin: '2023-12-15T09:15:00Z',
        avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=SJ'
    },
    {
        id: 'USR003',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@school.edu',
        role: 'teacher',
        status: 'Active',
        lastLogin: '2023-12-14T16:45:00Z',
        avatar: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=MB'
    },
    {
        id: 'USR004',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@school.edu',
        role: 'staff',
        status: 'Inactive',
        lastLogin: '2023-12-10T14:20:00Z',
        avatar: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=ED'
    }
];

// Sample permissions data
const permissionsData = [
    {
        role: 'Administrator',
        permissions: {
            'dashboard': true,
            'students': true,
            'teachers': true,
            'classes': true,
            'subjects': true,
            'attendance': true,
            'grades': true,
            'schedule': true,
            'finance': true,
            'reports': true,
            'settings': true
        }
    },
    {
        role: 'Teacher',
        permissions: {
            'dashboard': true,
            'students': true,
            'teachers': false,
            'classes': true,
            'subjects': true,
            'attendance': true,
            'grades': true,
            'schedule': true,
            'finance': false,
            'reports': true,
            'settings': false
        }
    },
    {
        role: 'Staff',
        permissions: {
            'dashboard': true,
            'students': true,
            'teachers': false,
            'classes': true,
            'subjects': false,
            'attendance': true,
            'grades': false,
            'schedule': true,
            'finance': false,
            'reports': false,
            'settings': false
        }
    },
    {
        role: 'Viewer',
        permissions: {
            'dashboard': true,
            'students': true,
            'teachers': false,
            'classes': true,
            'subjects': true,
            'attendance': true,
            'grades': true,
            'schedule': true,
            'finance': false,
            'reports': true,
            'settings': false
        }
    }
];

// Sample backup history data
const backupHistoryData = [
    {
        id: 'BKP001',
        date: '2023-12-15T02:00:00Z',
        type: 'Full Backup',
        size: '2.3 GB',
        status: 'Completed',
        location: '/backups/edumanage_20231215_020000.zip'
    },
    {
        id: 'BKP002',
        date: '2023-12-14T02:00:00Z',
        type: 'Full Backup',
        size: '2.2 GB',
        status: 'Completed',
        location: '/backups/edumanage_20231214_020000.zip'
    },
    {
        id: 'BKP003',
        date: '2023-12-13T02:00:00Z',
        type: 'Incremental Backup',
        size: '150 MB',
        status: 'Completed',
        location: '/backups/edumanage_20231213_020000.zip'
    },
    {
        id: 'BKP004',
        date: '2023-12-12T02:00:00Z',
        type: 'Full Backup',
        size: '2.1 GB',
        status: 'Failed',
        location: '/backups/edumanage_20231212_020000.zip'
    }
];

// State management
let currentTab = 'general';
let settingsData = {};

// DOM Elements
const settingsSearch = document.getElementById('settingsSearch');
const saveAllSettingsBtn = document.getElementById('saveAllSettingsBtn');
const addUserBtn = document.getElementById('addUserBtn');
const addUserModal = document.getElementById('addUserModal');
const addUserForm = document.getElementById('addUserForm');
const usersTableBody = document.getElementById('usersTableBody');
const permissionsGrid = document.getElementById('permissionsGrid');
const backupHistory = document.getElementById('backupHistory');

// Initialize Settings Page
document.addEventListener('DOMContentLoaded', function() {
    initializeSettingsPage();
    loadUsers();
    loadPermissions();
    loadBackupHistory();
    loadSettings();
    setupEventListeners();
});

// Initialize Settings Page
function initializeSettingsPage() {
    console.log('Settings Management Page Initialized');
    
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        redirectToLogin();
        return;
    }
    
    // Set active navigation
    setActiveNavigation();
    
    // Load settings from localStorage
    loadSettingsFromStorage();
}

// Setup Event Listeners
function setupEventListeners() {
    // Sidebar functionality
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('overlay');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
            document.body.classList.toggle('overflow-hidden');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            document.body.classList.remove('overflow-hidden');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            showNotification('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // Search functionality
    settingsSearch.addEventListener('input', handleSearch);
    
    // Save all settings button
    saveAllSettingsBtn.addEventListener('click', saveAllSettings);
    
    // Add user button
    addUserBtn.addEventListener('click', openAddUserModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeAddUserModal);
    document.getElementById('cancelBtn').addEventListener('click', closeAddUserModal);
    document.getElementById('saveUserBtn').addEventListener('click', saveUser);
    
    // Form submission
    addUserForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Backup actions
    document.getElementById('createBackupBtn').addEventListener('click', createBackup);
    document.getElementById('restoreBackupBtn').addEventListener('click', restoreBackup);
    document.getElementById('downloadBackupBtn').addEventListener('click', downloadBackup);
    
    // Settings form changes
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('change', markSettingsChanged);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Settings from Storage
function loadSettingsFromStorage() {
    const savedSettings = localStorage.getItem('schoolSettings');
    if (savedSettings) {
        settingsData = JSON.parse(savedSettings);
        populateSettingsForm();
    }
}

// Populate Settings Form
function populateSettingsForm() {
    Object.keys(settingsData).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = settingsData[key];
            } else {
                input.value = settingsData[key];
            }
        }
    });
}

// Load Users
function loadUsers() {
    usersTableBody.innerHTML = '';
    
    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="user-info">
                    <img src="${user.avatar}" alt="${user.firstName} ${user.lastName}" class="user-avatar">
                    <div class="user-details">
                        <span class="user-name">${user.firstName} ${user.lastName}</span>
                        <span class="user-email">${user.email}</span>
                    </div>
                </div>
            </td>
            <td>
                <span class="role-badge role-${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </td>
            <td>
                <span class="status-badge status-${user.status.toLowerCase()}">${user.status}</span>
            </td>
            <td>
                <span class="last-login">${formatDate(user.lastLogin)}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editUser('${user.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="toggleUserStatus('${user.id}')" title="Toggle Status">
                        <i class="fas fa-power-off"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteUser('${user.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// Load Permissions
function loadPermissions() {
    permissionsGrid.innerHTML = '';
    
    permissionsData.forEach(roleData => {
        const roleCard = document.createElement('div');
        roleCard.className = 'permission-card';
        roleCard.innerHTML = `
            <div class="permission-header">
                <h4>${roleData.role}</h4>
            </div>
            <div class="permission-list">
                ${Object.keys(roleData.permissions).map(permission => `
                    <div class="permission-item">
                        <span class="permission-name">${permission.charAt(0).toUpperCase() + permission.slice(1)}</span>
                        <label class="toggle-switch">
                            <input type="checkbox" ${roleData.permissions[permission] ? 'checked' : ''} 
                                   onchange="updatePermission('${roleData.role}', '${permission}', this.checked)">
                            <span class="slider"></span>
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
        permissionsGrid.appendChild(roleCard);
    });
}

// Load Backup History
function loadBackupHistory() {
    backupHistory.innerHTML = '';
    
    backupHistoryData.forEach(backup => {
        const backupItem = document.createElement('div');
        backupItem.className = 'backup-item';
        backupItem.innerHTML = `
            <div class="backup-info">
                <div class="backup-header">
                    <h4>${backup.type}</h4>
                    <span class="backup-date">${formatDate(backup.date)}</span>
                </div>
                <div class="backup-details">
                    <span class="backup-size">${backup.size}</span>
                    <span class="backup-status status-${backup.status.toLowerCase()}">${backup.status}</span>
                </div>
            </div>
            <div class="backup-actions">
                ${backup.status === 'Completed' ? `
                    <button class="btn btn-secondary" onclick="downloadBackupFile('${backup.id}')">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                ` : ''}
                <button class="btn btn-secondary" onclick="restoreFromBackup('${backup.id}')">
                    <i class="fas fa-upload"></i>
                    Restore
                </button>
            </div>
        `;
        backupHistory.appendChild(backupItem);
    });
}

// Load Settings
function loadSettings() {
    // This function can be used to load settings from a server
    // For now, we'll use the default values from the HTML
    console.log('Settings loaded');
}

// Handle Search
function handleSearch() {
    const searchTerm = settingsSearch.value.toLowerCase();
    // Implement search functionality across settings
    console.log('Searching for:', searchTerm);
}

// Handle Tab Click
function handleTabClick(event) {
    const tabName = event.target.dataset.tab;
    
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
}

// Mark Settings Changed
function markSettingsChanged() {
    saveAllSettingsBtn.classList.add('btn-warning');
    saveAllSettingsBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
}

// Save All Settings
function saveAllSettings() {
    const formData = new FormData();
    const settings = {};
    
    // Collect all form data
    document.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.type === 'checkbox') {
            settings[input.name] = input.checked;
        } else {
            settings[input.name] = input.value;
        }
    });
    
    // Save to localStorage
    localStorage.setItem('schoolSettings', JSON.stringify(settings));
    settingsData = settings;
    
    // Reset button
    saveAllSettingsBtn.classList.remove('btn-warning');
    saveAllSettingsBtn.innerHTML = '<i class="fas fa-save"></i> Save All Changes';
    
    showNotification('Settings saved successfully', 'success');
}

// Open Add User Modal
function openAddUserModal() {
    addUserModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Add User Modal
function closeAddUserModal() {
    addUserModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.add('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeAddUserModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveUser();
}

// Save User
function saveUser() {
    const formData = new FormData(addUserForm);
    const userData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateUserForm(userData)) {
        return;
    }
    
    // Generate user ID
    userData.id = generateUserId();
    userData.avatar = `https://via.placeholder.com/40x40/2563eb/ffffff?text=${userData.userFirstName[0]}${userData.userLastName[0]}`;
    userData.status = 'Active';
    userData.lastLogin = new Date().toISOString();
    
    // Add to users data
    usersData.push(userData);
    
    // Refresh display
    loadUsers();
    closeAddUserModal();
    
    showNotification('User added successfully', 'success');
}

// Validate User Form
function validateUserForm(data) {
    const requiredFields = ['userFirstName', 'userLastName', 'userEmail', 'userRole', 'userPassword'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.userEmail)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

// Generate User ID
function generateUserId() {
    const lastId = usersData.length > 0 ? 
        Math.max(...usersData.map(u => parseInt(u.id.replace('USR', '')))) : 0;
    return `USR${String(lastId + 1).padStart(3, '0')}`;
}

// Edit User
function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    // Populate form with user data
    document.getElementById('userFirstName').value = user.firstName;
    document.getElementById('userLastName').value = user.lastName;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;
    
    openAddUserModal();
}

// Toggle User Status
function toggleUserStatus(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    loadUsers();
    
    showNotification(`User ${user.status.toLowerCase()} successfully`, 'success');
}

// Delete User
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = usersData.findIndex(u => u.id === userId);
        if (index >= 0) {
            usersData.splice(index, 1);
            loadUsers();
            showNotification('User deleted successfully', 'success');
        }
    }
}

// Update Permission
function updatePermission(role, permission, enabled) {
    const roleData = permissionsData.find(r => r.role === role);
    if (roleData) {
        roleData.permissions[permission] = enabled;
        showNotification(`Permission updated for ${role}`, 'success');
    }
}

// Create Backup
function createBackup() {
    showNotification('Creating backup...', 'info');
    
    // Simulate backup creation
    setTimeout(() => {
        const newBackup = {
            id: `BKP${String(backupHistoryData.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString(),
            type: 'Full Backup',
            size: '2.4 GB',
            status: 'Completed',
            location: `/backups/edumanage_${new Date().toISOString().split('T')[0]}_${Date.now()}.zip`
        };
        
        backupHistoryData.unshift(newBackup);
        loadBackupHistory();
        showNotification('Backup created successfully', 'success');
    }, 2000);
}

// Restore Backup
function restoreBackup() {
    if (confirm('Are you sure you want to restore from backup? This will overwrite current data.')) {
        showNotification('Restoring from backup...', 'info');
        
        setTimeout(() => {
            showNotification('Backup restored successfully', 'success');
        }, 3000);
    }
}

// Download Backup
function downloadBackup() {
    showNotification('Preparing backup download...', 'info');
    
    setTimeout(() => {
        showNotification('Backup download started', 'success');
    }, 1000);
}

// Download Backup File
function downloadBackupFile(backupId) {
    const backup = backupHistoryData.find(b => b.id === backupId);
    if (backup) {
        showNotification(`Downloading ${backup.type}...`, 'info');
    }
}

// Restore From Backup
function restoreFromBackup(backupId) {
    const backup = backupHistoryData.find(b => b.id === backupId);
    if (backup) {
        if (confirm(`Are you sure you want to restore from ${backup.type}?`)) {
            showNotification('Restoring from backup...', 'info');
        }
    }
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Add CSS for additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
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
    
    .overflow-hidden {
        overflow: hidden;
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    .overlay.show {
        opacity: 1;
        visibility: visible;
    }
    
    @media (max-width: 768px) {
        .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
    }
    
    .page-content {
        padding: 2rem;
    }
    
    .settings-tabs {
        display: flex;
        gap: 0.5rem;
        margin: 2rem 0;
        border-bottom: 1px solid #e5e7eb;
        overflow-x: auto;
    }
    
    .tab-btn {
        background: none;
        border: none;
        padding: 0.75rem 1.5rem;
        color: #6b7280;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
        border-bottom: 2px solid transparent;
        transition: all 0.15s ease;
        white-space: nowrap;
    }
    
    .tab-btn.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
    }
    
    .tab-content {
        display: none;
    }
    
    .tab-content.active {
        display: block;
    }
    
    .settings-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .settings-section {
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .settings-section h3 {
        margin: 0 0 1.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .settings-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-group label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
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
    
    .users-table-container {
        overflow-x: auto;
    }
    
    .data-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .data-table th,
    .data-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .data-table th {
        background: #f9fafb;
        font-weight: 600;
        color: #374151;
        font-size: 0.875rem;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .user-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .user-name {
        font-weight: 500;
        color: #111827;
    }
    
    .user-email {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .role-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .role-admin {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .role-teacher {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .role-staff {
        background: #dcfce7;
        color: #166534;
    }
    
    .role-viewer {
        background: #f3f4f6;
        color: #6b7280;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-active {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-inactive {
        background: #f3f4f6;
        color: #6b7280;
    }
    
    .last-login {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-icon {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.375rem;
        transition: all 0.15s ease;
    }
    
    .btn-icon:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .permissions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .permission-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .permission-header h4 {
        margin: 0 0 1rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .permission-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .permission-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .permission-name {
        font-size: 0.875rem;
        color: #374151;
    }
    
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }
    
    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
    
    input:checked + .slider {
        background-color: #2563eb;
    }
    
    input:checked + .slider:before {
        transform: translateX(26px);
    }
    
    .notification-settings {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .notification-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.75rem;
        border: 1px solid #e5e7eb;
    }
    
    .notification-info h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
    }
    
    .notification-info p {
        margin: 0;
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .backup-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .backup-history {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .backup-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: #f9fafb;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
    }
    
    .backup-info {
        flex: 1;
    }
    
    .backup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .backup-header h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
    }
    
    .backup-date {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .backup-details {
        display: flex;
        gap: 1rem;
    }
    
    .backup-size {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .backup-status {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-completed {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-failed {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .backup-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-warning {
        background: #f59e0b;
        color: white;
    }
    
    .btn-warning:hover {
        background: #d97706;
    }
`;
document.head.appendChild(additionalStyles);

console.log('Settings Management JavaScript loaded successfully');



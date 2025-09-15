// Finance Management JavaScript

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

// Sample financial data
const transactionsData = [
    {
        id: 'TXN001',
        studentId: 'STU001',
        studentName: 'Rahul',
        type: 'Tuition Fee',
        amount: 2500.00,
        date: '2023-12-15',
        status: 'Paid',
        paymentMethod: 'Bank Transfer',
        notes: 'Q2 Tuition Fee',
        reference: 'TXN-2023-001'
    },
    {
        id: 'TXN002',
        studentId: 'STU002',
        studentName: 'Sheetal',
        type: 'Exam Fee',
        amount: 150.00,
        date: '2023-12-14',
        status: 'Paid',
        paymentMethod: 'Credit Card',
        notes: 'Final Exam Fee',
        reference: 'TXN-2023-002'
    },
    {
        id: 'TXN003',
        studentId: 'STU003',
        studentName: 'Vijay',
        type: 'Tuition Fee',
        amount: 2500.00,
        date: '2023-12-10',
        status: 'Pending',
        paymentMethod: 'Online Payment',
        notes: 'Q2 Tuition Fee - Partial',
        reference: 'TXN-2023-003'
    },
    {
        id: 'TXN004',
        studentId: 'STU004',
        studentName: 'Rasmi',
        type: 'Library Fee',
        amount: 75.00,
        date: '2023-12-08',
        status: 'Overdue',
        paymentMethod: 'Cash',
        notes: 'Library Membership Fee',
        reference: 'TXN-2023-004'
    },
    {
        id: 'TXN005',
        studentId: 'STU005',
        studentName: 'Shubham',
        type: 'Transport Fee',
        amount: 300.00,
        date: '2023-12-12',
        status: 'Paid',
        paymentMethod: 'Check',
        notes: 'Monthly Transport Fee',
        reference: 'TXN-2023-005'
    }
];

// Sample fee structures
const feesData = [
    {
        id: 'FEE001',
        name: 'Tuition Fee - Grade 9',
        grade: 'Grade 9',
        amount: 2000.00,
        frequency: 'Quarterly',
        description: 'Quarterly tuition fee for Grade 9 students',
        status: 'Active',
        dueDate: '2024-01-15'
    },
    {
        id: 'FEE002',
        name: 'Tuition Fee - Grade 10',
        grade: 'Grade 10',
        amount: 2200.00,
        frequency: 'Quarterly',
        description: 'Quarterly tuition fee for Grade 10 students',
        status: 'Active',
        dueDate: '2024-01-15'
    },
    {
        id: 'FEE003',
        name: 'Tuition Fee - Grade 11',
        grade: 'Grade 11',
        amount: 2400.00,
        frequency: 'Quarterly',
        description: 'Quarterly tuition fee for Grade 11 students',
        status: 'Active',
        dueDate: '2024-01-15'
    },
    {
        id: 'FEE004',
        name: 'Tuition Fee - Grade 12',
        grade: 'Grade 12',
        amount: 2500.00,
        frequency: 'Quarterly',
        description: 'Quarterly tuition fee for Grade 12 students',
        status: 'Active',
        dueDate: '2024-01-15'
    },
    {
        id: 'FEE005',
        name: 'Exam Fee',
        grade: 'All Grades',
        amount: 150.00,
        frequency: 'Per Exam',
        description: 'Examination fee for all students',
        status: 'Active',
        dueDate: '2024-02-01'
    },
    {
        id: 'FEE006',
        name: 'Library Fee',
        grade: 'All Grades',
        amount: 75.00,
        frequency: 'Annual',
        description: 'Annual library membership fee',
        status: 'Active',
        dueDate: '2024-03-01'
    }
];

// Sample payment methods
const paymentMethodsData = [
    {
        id: 'PM001',
        name: 'Bank Transfer',
        type: 'Electronic',
        status: 'Active',
        processingFee: 0.00,
        description: 'Direct bank transfer payments'
    },
    {
        id: 'PM002',
        name: 'Credit Card',
        type: 'Electronic',
        status: 'Active',
        processingFee: 2.5,
        description: 'Credit card payments via payment gateway'
    },
    {
        id: 'PM003',
        name: 'Cash',
        type: 'Physical',
        status: 'Active',
        processingFee: 0.00,
        description: 'Cash payments at school office'
    },
    {
        id: 'PM004',
        name: 'Check',
        type: 'Physical',
        status: 'Active',
        processingFee: 0.00,
        description: 'Check payments'
    },
    {
        id: 'PM005',
        name: 'Online Payment',
        type: 'Electronic',
        status: 'Active',
        processingFee: 1.5,
        description: 'Online payment portal'
    }
];

// State management
let currentTab = 'transactions';
let filteredTransactions = [...transactionsData];

// DOM Elements
const financeSearch = document.getElementById('financeSearch');
const statusFilter = document.getElementById('statusFilter');
const addTransactionBtn = document.getElementById('addTransactionBtn');
const transactionModal = document.getElementById('transactionModal');
const transactionForm = document.getElementById('transactionForm');
const transactionsTableBody = document.getElementById('transactionsTableBody');
const feesGrid = document.getElementById('feesGrid');
const paymentMethodsGrid = document.getElementById('paymentMethodsGrid');
const totalRevenue = document.getElementById('totalRevenue');
const pendingAmount = document.getElementById('pendingAmount');
const overdueAmount = document.getElementById('overdueAmount');
const collectionRate = document.getElementById('collectionRate');

// Initialize Finance Page
document.addEventListener('DOMContentLoaded', function() {
    initializeFinancePage();
    loadTransactions();
    loadFees();
    loadPaymentMethods();
    updateStats();
    setupEventListeners();
});

// Initialize Finance Page
function initializeFinancePage() {
    console.log('Finance Management Page Initialized');
    
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        redirectToLogin();
        return;
    }
    
    // Set active navigation
    setActiveNavigation();
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
    financeSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    statusFilter.addEventListener('change', handleFilter);
    
    // Add transaction button
    addTransactionBtn.addEventListener('click', openAddTransactionModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeTransactionModal);
    document.getElementById('cancelBtn').addEventListener('click', closeTransactionModal);
    document.getElementById('saveTransactionBtn').addEventListener('click', saveTransaction);
    
    // Form submission
    transactionForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Select all checkbox
    document.getElementById('selectAll').addEventListener('change', handleSelectAll);
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Transactions
function loadTransactions() {
    transactionsTableBody.innerHTML = '';
    
    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <input type="checkbox" class="transaction-checkbox" value="${transaction.id}">
            </td>
            <td>
                <div class="student-info">
                    <img src="https://via.placeholder.com/32x32/2563eb/ffffff?text=${transaction.studentName.split(' ').map(n => n[0]).join('')}" alt="${transaction.studentName}" class="student-photo">
                    <span class="student-name">${transaction.studentName}</span>
                </div>
            </td>
            <td>
                <span class="transaction-id">${transaction.reference}</span>
            </td>
            <td>
                <span class="transaction-type">${transaction.type}</span>
            </td>
            <td>
                <span class="transaction-amount">$${transaction.amount.toFixed(2)}</span>
            </td>
            <td>
                <span class="transaction-date">${formatDate(transaction.date)}</span>
            </td>
            <td>
                <span class="status-badge status-${transaction.status.toLowerCase()}">${transaction.status}</span>
            </td>
            <td>
                <span class="payment-method">${transaction.paymentMethod}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewTransaction('${transaction.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editTransaction('${transaction.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteTransaction('${transaction.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        transactionsTableBody.appendChild(row);
    });
}

// Load Fees
function loadFees() {
    feesGrid.innerHTML = '';
    
    feesData.forEach(fee => {
        const feeCard = document.createElement('div');
        feeCard.className = 'fee-card';
        feeCard.innerHTML = `
            <div class="fee-header">
                <h4>${fee.name}</h4>
                <span class="fee-status status-${fee.status.toLowerCase()}">${fee.status}</span>
            </div>
            <div class="fee-info">
                <div class="fee-amount">$${fee.amount.toFixed(2)}</div>
                <div class="fee-details">
                    <p><strong>Grade:</strong> ${fee.grade}</p>
                    <p><strong>Frequency:</strong> ${fee.frequency}</p>
                    <p><strong>Due Date:</strong> ${formatDate(fee.dueDate)}</p>
                </div>
                <div class="fee-description">
                    <p>${fee.description}</p>
                </div>
            </div>
            <div class="fee-actions">
                <button class="btn-icon" onclick="editFee('${fee.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="viewFeeStudents('${fee.id}')" title="View Students">
                    <i class="fas fa-users"></i>
                </button>
            </div>
        `;
        feesGrid.appendChild(feeCard);
    });
}

// Load Payment Methods
function loadPaymentMethods() {
    paymentMethodsGrid.innerHTML = '';
    
    paymentMethodsData.forEach(method => {
        const methodCard = document.createElement('div');
        methodCard.className = 'payment-method-card';
        methodCard.innerHTML = `
            <div class="method-header">
                <h4>${method.name}</h4>
                <span class="method-type">${method.type}</span>
            </div>
            <div class="method-info">
                <div class="method-fee">
                    <span class="fee-label">Processing Fee:</span>
                    <span class="fee-value">${method.processingFee}%</span>
                </div>
                <div class="method-description">
                    <p>${method.description}</p>
                </div>
                <div class="method-status">
                    <span class="status-badge status-${method.status.toLowerCase()}">${method.status}</span>
                </div>
            </div>
            <div class="method-actions">
                <button class="btn-icon" onclick="editPaymentMethod('${method.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="togglePaymentMethod('${method.id}')" title="Toggle Status">
                    <i class="fas fa-power-off"></i>
                </button>
            </div>
        `;
        paymentMethodsGrid.appendChild(methodCard);
    });
}

// Handle Search
function handleSearch() {
    const searchTerm = financeSearch.value.toLowerCase();
    filteredTransactions = transactionsData.filter(transaction => 
        transaction.studentName.toLowerCase().includes(searchTerm) ||
        transaction.type.toLowerCase().includes(searchTerm) ||
        transaction.reference.toLowerCase().includes(searchTerm) ||
        transaction.paymentMethod.toLowerCase().includes(searchTerm)
    );
    
    loadTransactions();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedStatus = statusFilter.value;
    
    if (selectedStatus) {
        filteredTransactions = transactionsData.filter(transaction => transaction.status === selectedStatus);
    } else {
        filteredTransactions = [...transactionsData];
    }
    
    loadTransactions();
    updateStats();
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

// Handle Select All
function handleSelectAll(event) {
    const isChecked = event.target.checked;
    document.querySelectorAll('.transaction-checkbox').forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

// Open Add Transaction Modal
function openAddTransactionModal() {
    document.getElementById('modalTitle').textContent = 'Add New Transaction';
    transactionForm.reset();
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transactionDate').value = today;
    
    transactionModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Transaction Modal
function closeTransactionModal() {
    transactionModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeTransactionModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveTransaction();
}

// Save Transaction
function saveTransaction() {
    const formData = new FormData(transactionForm);
    const transactionData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateTransactionForm(transactionData)) {
        return;
    }
    
    // Generate transaction ID and reference
    transactionData.id = generateTransactionId();
    transactionData.reference = `TXN-2023-${String(transactionsData.length + 1).padStart(3, '0')}`;
    
    // Get student name
    const studentSelect = document.getElementById('transactionStudent');
    const selectedStudent = studentSelect.options[studentSelect.selectedIndex];
    transactionData.studentName = selectedStudent.textContent.split(' - ')[0];
    
    // Convert amount to number
    transactionData.amount = parseFloat(transactionData.transactionAmount);
    
    // Add to transactions data
    transactionsData.push(transactionData);
    
    // Refresh display
    filteredTransactions = [...transactionsData];
    loadTransactions();
    updateStats();
    closeTransactionModal();
    
    showNotification('Transaction added successfully', 'success');
}

// Validate Transaction Form
function validateTransactionForm(data) {
    const requiredFields = ['transactionStudent', 'transactionType', 'transactionAmount', 'transactionDate', 'transactionStatus', 'transactionMethod'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate amount
    if (isNaN(data.transactionAmount) || data.transactionAmount <= 0) {
        showNotification('Amount must be a positive number', 'error');
        return false;
    }
    
    return true;
}

// Generate Transaction ID
function generateTransactionId() {
    const lastId = transactionsData.length > 0 ? 
        Math.max(...transactionsData.map(t => parseInt(t.id.replace('TXN', '')))) : 0;
    return `TXN${String(lastId + 1).padStart(3, '0')}`;
}

// View Transaction
function viewTransaction(transactionId) {
    const transaction = transactionsData.find(t => t.id === transactionId);
    if (!transaction) return;
    
    showNotification(`Viewing transaction ${transaction.reference}`, 'info');
}

// Edit Transaction
function editTransaction(transactionId) {
    const transaction = transactionsData.find(t => t.id === transactionId);
    if (!transaction) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Transaction';
    
    // Populate form with transaction data
    Object.keys(transaction).forEach(key => {
        const input = document.getElementById(`transaction${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (input) {
            input.value = transaction[key];
        }
    });
    
    transactionModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Transaction
function deleteTransaction(transactionId) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        const index = transactionsData.findIndex(t => t.id === transactionId);
        if (index >= 0) {
            transactionsData.splice(index, 1);
            filteredTransactions = [...transactionsData];
            loadTransactions();
            updateStats();
            showNotification('Transaction deleted successfully', 'success');
        }
    }
}

// Update Stats
function updateStats() {
    const totalRevenueValue = transactionsData
        .filter(t => t.status === 'Paid')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const pendingValue = transactionsData
        .filter(t => t.status === 'Pending')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const overdueValue = transactionsData
        .filter(t => t.status === 'Overdue')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalTransactions = transactionsData.length;
    const paidTransactions = transactionsData.filter(t => t.status === 'Paid').length;
    const collectionRateValue = totalTransactions > 0 ? ((paidTransactions / totalTransactions) * 100).toFixed(1) : 0;
    
    document.getElementById('totalRevenue').textContent = `$${totalRevenueValue.toLocaleString()}`;
    document.getElementById('pendingAmount').textContent = `$${pendingValue.toLocaleString()}`;
    document.getElementById('overdueAmount').textContent = `$${overdueValue.toLocaleString()}`;
    document.getElementById('collectionRate').textContent = `${collectionRateValue}%`;
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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
    
    .finance-tabs {
        display: flex;
        gap: 0.5rem;
        margin: 2rem 0;
        border-bottom: 1px solid #e5e7eb;
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
    
    .transactions-container,
    .fees-container,
    .payments-container,
    .reports-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .transactions-header,
    .fees-header,
    .payments-header,
    .reports-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .transactions-header h3,
    .fees-header h3,
    .payments-header h3,
    .reports-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .transactions-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .transactions-table-container {
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
    
    .data-table td {
        font-size: 0.875rem;
    }
    
    .student-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .student-photo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .student-name {
        font-weight: 500;
        color: #111827;
    }
    
    .transaction-id {
        font-family: monospace;
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .transaction-type {
        font-weight: 500;
        color: #111827;
    }
    
    .transaction-amount {
        font-weight: 600;
        color: #059669;
    }
    
    .transaction-date {
        color: #6b7280;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-paid {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-pending {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-overdue {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .status-partial {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .payment-method {
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
    
    .fees-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }
    
    .fee-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .fee-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .fee-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .fee-header h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .fee-amount {
        font-size: 1.5rem;
        font-weight: 700;
        color: #059669;
        margin-bottom: 1rem;
    }
    
    .fee-details p {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .fee-description p {
        margin: 0;
        font-size: 0.875rem;
        color: #6b7280;
        font-style: italic;
    }
    
    .fee-actions {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .payment-methods-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .payment-method-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .payment-method-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .method-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .method-header h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .method-type {
        background: #2563eb;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .method-fee {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: white;
        border-radius: 0.5rem;
    }
    
    .fee-label {
        font-weight: 500;
        color: #6b7280;
    }
    
    .fee-value {
        font-weight: 600;
        color: #111827;
    }
    
    .method-description p {
        margin: 0 0 1rem 0;
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .method-status {
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .method-actions {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .reports-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .report-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: #f9fafb;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .report-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .report-icon {
        width: 60px;
        height: 60px;
        background: #2563eb;
        color: white;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }
    
    .report-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
    }
    
    .report-content p {
        margin: 0 0 1rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(additionalStyles);

console.log('Finance Management JavaScript loaded successfully');



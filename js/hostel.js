// Hostel Management JavaScript

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
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="notification-message">
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
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
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sample data
const residentsData = [
    {
        id: 'STU001',
        firstName: 'Ajay',
        lastName: 'Verma',
        email: 'ajayverma@school.com',
        phone: '6393149489',
        block: 'Block A',
        roomNumber: '101',
        bedNumber: 'Bed 1',
        status: 'Active',
        checkInDate: '2023-09-01',
        emergencyContact: 'Savit Ram',
        emergencyPhone: '00000000000',
        photo: 'img/Ajay.jpg'
    },
    {
        id: 'STU002',
        firstName: 'Siddhant',
        lastName: 'Pathak',
        email: 'sp@school.com',
        phone: '9140951883',
        block: 'Block B',
        roomNumber: '205',
        bedNumber: 'Bed 2',
        status: 'Active',
        checkInDate: '2023-09-01',
        emergencyContact: 'Anand Pathak',
        emergencyPhone: '0000000000',
        photo: 'img/siddhant.jpg'
    },
    {
        id: 'STU003',
        firstName: 'Kanisha',
        lastName: 'Yadav',
        email: 'kanisha@school.com',
        phone: '0000000000',
        block: 'Block C',
        roomNumber: '301',
        bedNumber: 'Bed 1',
        status: 'Active',
        checkInDate: '2023-09-01',
        emergencyContact: 'Mr. Yadav',
        emergencyPhone: '0000000000',
        photo: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=KY'
    },
    {
        id: 'STU004',
        firstName: 'Shrishti',
        lastName: 'Shahi',
        email: 'ss@school.com',
        phone: '00000000000',
        block: 'Block A',
        roomNumber: '102',
        bedNumber: 'Bed 3',
        status: 'Active',
        checkInDate: '2023-09-01',
        emergencyContact: '........',
        emergencyPhone: '00000000000',
        photo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=SS'
    },
    {
        id: 'STU005',
        firstName: 'Vanshika',
        lastName: 'Yadav',
        email: 'Vy@school.com',
        phone: '0000000000',
        block: 'Block B',
        roomNumber: '206',
        bedNumber: 'Bed 4',
        status: 'Graduated',
        checkInDate: '2022-09-01',
        emergencyContact: '..........',
        emergencyPhone: '000000000',
        photo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=VY'
    }
];

// State management
let currentPage = 1;
let itemsPerPage = 25;
let filteredResidents = [...residentsData];
let selectedResidents = new Set();

// DOM Elements
const residentsTableBody = document.getElementById('residentsTableBody');
const hostelSearch = document.getElementById('hostelSearch');
const blockFilter = document.getElementById('blockFilter');
const addResidentBtn = document.getElementById('addResidentBtn');
const residentModal = document.getElementById('residentModal');
const residentDetailsModal = document.getElementById('residentDetailsModal');
const residentForm = document.getElementById('residentForm');
const selectAllCheckbox = document.getElementById('selectAll');
const totalResidents = document.getElementById('totalResidents');
const occupiedRooms = document.getElementById('occupiedRooms');
const availableRooms = document.getElementById('availableRooms');

// Initialize Hostel Page
document.addEventListener('DOMContentLoaded', function() {
    initializeHostelPage();
    loadResidentsTable();
    updateStats();
    setupEventListeners();
    
    // Check for hash navigation
    if (window.location.hash === '#add') {
        setTimeout(() => {
            openAddResidentModal();
        }, 100);
    }
});

// Initialize Hostel Page
function initializeHostelPage() {
    console.log('Hostel Management Page Initialized');
    
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
    // Search functionality
    hostelSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    blockFilter.addEventListener('change', handleFilter);
    
    // Add resident button
    addResidentBtn.addEventListener('click', openAddResidentModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeResidentModal);
    document.getElementById('closeDetailsModal').addEventListener('click', closeResidentDetailsModal);
    document.getElementById('cancelBtn').addEventListener('click', closeResidentModal);
    document.getElementById('saveResidentBtn').addEventListener('click', saveResident);
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', handleSelectAll);
    
    // Form submission
    residentForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Residents Table
function loadResidentsTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageResidents = filteredResidents.slice(startIndex, endIndex);
    
    residentsTableBody.innerHTML = '';
    
    pageResidents.forEach(resident => {
        const row = createResidentRow(resident);
        residentsTableBody.appendChild(row);
    });
    
    updatePagination();
}

// Create Resident Row
function createResidentRow(resident) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="checkbox" class="resident-checkbox" value="${resident.id}">
        </td>
        <td>${resident.id}</td>
        <td>
            <img src="${resident.photo}" alt="${resident.firstName} ${resident.lastName}" class="resident-photo">
        </td>
        <td>
            <div class="resident-name">
                <strong>${resident.firstName} ${resident.lastName}</strong>
            </div>
        </td>
        <td>${resident.roomNumber}</td>
        <td>${resident.block}</td>
        <td>${formatDate(resident.checkInDate)}</td>
        <td>
            <span class="status-badge status-${resident.status.toLowerCase()}">${resident.status}</span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" onclick="viewResident('${resident.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="editResident('${resident.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteResident('${resident.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    // Add checkbox event listener
    const checkbox = row.querySelector('.resident-checkbox');
    checkbox.addEventListener('change', handleResidentSelect);
    
    return row;
}

// Handle Search
function handleSearch() {
    const searchTerm = hostelSearch.value.toLowerCase();
    filteredResidents = residentsData.filter(resident => 
        resident.firstName.toLowerCase().includes(searchTerm) ||
        resident.lastName.toLowerCase().includes(searchTerm) ||
        resident.id.toLowerCase().includes(searchTerm) ||
        resident.email.toLowerCase().includes(searchTerm) ||
        resident.roomNumber.toLowerCase().includes(searchTerm) ||
        resident.block.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    loadResidentsTable();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedBlock = blockFilter.value;
    
    if (selectedBlock) {
        filteredResidents = residentsData.filter(resident => resident.block === selectedBlock);
    } else {
        filteredResidents = [...residentsData];
    }
    
    currentPage = 1;
    loadResidentsTable();
    updateStats();
}

// Handle Select All
function handleSelectAll() {
    const checkboxes = document.querySelectorAll('.resident-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        if (selectAllCheckbox.checked) {
            selectedResidents.add(checkbox.value);
        } else {
            selectedResidents.delete(checkbox.value);
        }
    });
}

// Handle Resident Select
function handleResidentSelect(event) {
    const residentId = event.target.value;
    
    if (event.target.checked) {
        selectedResidents.add(residentId);
    } else {
        selectedResidents.delete(residentId);
    }
    
    // Update select all checkbox
    const checkboxes = document.querySelectorAll('.resident-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.resident-checkbox:checked');
    selectAllCheckbox.checked = checkboxes.length === checkedCheckboxes.length;
}

// Open Add Resident Modal
function openAddResidentModal() {
    document.getElementById('modalTitle').textContent = 'Add New Resident';
    residentForm.reset();
    residentModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Resident Modal
function closeResidentModal() {
    residentModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Resident Details Modal
function closeResidentDetailsModal() {
    residentDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeResidentModal();
    closeResidentDetailsModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveResident();
}

// Save Resident
function saveResident() {
    const formData = new FormData(residentForm);
    const residentData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateResidentForm(residentData)) {
        return;
    }
    
    // Generate resident ID if adding new
    if (!residentData.studentId || residentData.studentId === '') {
        residentData.studentId = generateResidentId();
    }
    
    // Add photo URL
    residentData.photo = `https://via.placeholder.com/40x40/2563eb/ffffff?text=${residentData.firstName[0]}${residentData.lastName[0]}`;
    
    // Add to residents data
    const existingIndex = residentsData.findIndex(r => r.id === residentData.studentId);
    if (existingIndex >= 0) {
        residentsData[existingIndex] = residentData;
        showNotification('Resident updated successfully', 'success');
    } else {
        residentsData.push(residentData);
        showNotification('Resident added successfully', 'success');
    }
    
    // Refresh table
    filteredResidents = [...residentsData];
    loadResidentsTable();
    updateStats();
    closeResidentModal();
}

// Validate Resident Form
function validateResidentForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'block', 'roomNumber', 'bedNumber', 'status', 'checkInDate', 'emergencyContact', 'emergencyPhone'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

// Generate Resident ID
function generateResidentId() {
    const lastId = residentsData.length > 0 ? 
        Math.max(...residentsData.map(r => parseInt(r.id.replace('STU', '')))) : 0;
    return `STU${String(lastId + 1).padStart(3, '0')}`;
}

// View Resident
function viewResident(residentId) {
    const resident = residentsData.find(r => r.id === residentId);
    if (!resident) return;
    
    // Populate resident details
    document.getElementById('detailPhoto').src = resident.photo;
    document.getElementById('detailName').textContent = `${resident.firstName} ${resident.lastName}`;
    document.getElementById('detailRoom').textContent = `Room ${resident.roomNumber}, ${resident.block}`;
    document.getElementById('detailId').textContent = `Student ID: ${resident.id}`;
    document.getElementById('detailStatus').textContent = resident.status;
    document.getElementById('detailEmail').textContent = resident.email;
    document.getElementById('detailPhone').textContent = resident.phone;
    document.getElementById('detailCheckIn').textContent = formatDate(resident.checkInDate);
    document.getElementById('detailEmergencyContact').textContent = resident.emergencyContact;
    document.getElementById('detailEmergencyPhone').textContent = resident.emergencyPhone;
    document.getElementById('detailBlock').textContent = resident.block;
    document.getElementById('detailRoomNumber').textContent = resident.roomNumber;
    document.getElementById('detailBedNumber').textContent = resident.bedNumber;
    document.getElementById('detailRoomType').textContent = 'Shared (4 beds)';
    
    // Update status badge class
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.className = `status-badge status-${resident.status.toLowerCase()}`;
    
    residentDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Edit Resident
function editResident(residentId) {
    const resident = residentsData.find(r => r.id === residentId);
    if (!resident) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Resident';
    
    // Populate form with resident data
    Object.keys(resident).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = resident[key];
        }
    });
    
    residentModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Resident
function deleteResident(residentId) {
    if (confirm('Are you sure you want to delete this resident?')) {
        const index = residentsData.findIndex(r => r.id === residentId);
        if (index >= 0) {
            residentsData.splice(index, 1);
            filteredResidents = [...residentsData];
            loadResidentsTable();
            updateStats();
            showNotification('Resident deleted successfully', 'success');
        }
    }
}

// Handle Tab Click
function handleTabClick(event) {
    const tabName = event.target.dataset.tab;
    
    // Remove active class from all tabs and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding pane
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Update Stats
function updateStats() {
    if (totalResidents) {
        totalResidents.textContent = filteredResidents.length.toLocaleString();
    }
    
    if (occupiedRooms) {
        const occupiedCount = filteredResidents.filter(r => r.status === 'Active').length;
        occupiedRooms.textContent = occupiedCount.toLocaleString();
    }
    
    if (availableRooms) {
        // Calculate available rooms (mock data)
        const totalRooms = 93; // Total rooms across all blocks
        const occupiedCount = filteredResidents.filter(r => r.status === 'Active').length;
        const availableCount = totalRooms - occupiedCount;
        availableRooms.textContent = availableCount.toLocaleString();
    }
}

// Update Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredResidents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredResidents.length);
    
    document.getElementById('showingFrom').textContent = startIndex;
    document.getElementById('showingTo').textContent = endIndex;
    document.getElementById('totalRecords').textContent = filteredResidents.length.toLocaleString();
    
    // Update pagination buttons
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
    
    // Generate page numbers
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => goToPage(i));
            pageNumbers.appendChild(pageBtn);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'page-ellipsis';
            pageNumbers.appendChild(ellipsis);
        }
    }
}

// Go to Page
function goToPage(page) {
    currentPage = page;
    loadResidentsTable();
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// View Block Details
function viewBlockDetails(block) {
    showNotification(`Viewing details for Block ${block}`, 'info');
    // This would open a detailed view of the specific block
}

// Add CSS for additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .page-content {
        padding: 2rem;
    }
    
    .blocks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .block-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
    }
    
    .block-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .block-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .block-status {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .block-status.available {
        background: #dcfce7;
        color: #166534;
    }
    
    .block-status.occupied {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .block-status.maintenance {
        background: #fef3c7;
        color: #92400e;
    }
    
    .block-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .block-stat {
        text-align: center;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 0.5rem;
    }
    
    .block-stat .stat-label {
        display: block;
        font-size: 0.75rem;
        color: #6b7280;
        margin-bottom: 0.25rem;
    }
    
    .block-stat .stat-value {
        display: block;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .block-actions {
        display: flex;
        justify-content: center;
    }
    
    .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
    }
    
    .table-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-top: 2rem;
    }
    
    .table-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .table-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .table-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .table-wrapper {
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
        color: #6b7280;
    }
    
    .resident-photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .resident-name strong {
        color: #111827;
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
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-suspended {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .status-graduated {
        background: #e0e7ff;
        color: #3730a3;
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
    
    .pagination {
        padding: 1.5rem 2rem;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .pagination-info {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .pagination-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .page-btn {
        background: none;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.15s ease;
    }
    
    .page-btn:hover {
        background: #f3f4f6;
    }
    
    .page-btn.active {
        background: #2563eb;
        border-color: #2563eb;
        color: white;
    }
    
    .page-ellipsis {
        padding: 0.5rem;
        color: #6b7280;
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
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
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .modal-content.large {
        max-width: 800px;
    }
    
    .modal-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.375rem;
        transition: all 0.15s ease;
    }
    
    .modal-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .modal-footer {
        padding: 1.5rem 2rem;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.5rem;
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
    
    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
        border: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .btn-primary {
        background: #2563eb;
        color: white;
    }
    
    .btn-primary:hover {
        background: #1d4ed8;
    }
    
    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
    }
    
    .btn-secondary:hover {
        background: #e5e7eb;
    }
    
    .filter-container {
        position: relative;
    }
    
    .filter-select {
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        background: white;
        font-size: 0.875rem;
        min-width: 150px;
    }
    
    .resident-profile {
        padding: 1rem;
    }
    
    .profile-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .profile-photo img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .profile-info h2 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #111827;
    }
    
    .profile-info p {
        margin: 0 0 0.25rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .profile-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .tab-btn {
        background: none;
        border: none;
        padding: 0.75rem 1rem;
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
    
    .tab-pane {
        display: none;
    }
    
    .tab-pane.active {
        display: block;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .info-item.full-width {
        grid-column: 1 / -1;
    }
    
    .info-item label {
        font-size: 0.75rem;
        font-weight: 500;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .info-item span {
        font-size: 0.875rem;
        color: #111827;
    }
    
    .attendance-stats,
    .maintenance-stats {
        display: flex;
        gap: 2rem;
        margin-top: 1rem;
    }
    
    .attendance-stat,
    .maintenance-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        min-width: 100px;
    }
    
    .stat-label {
        font-size: 0.75rem;
        color: #6b7280;
        margin-bottom: 0.25rem;
    }
    
    .stat-value {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .modal-open {
        overflow: hidden;
    }
    
    /* Notification Styles */
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
`;
document.head.appendChild(additionalStyles);

console.log('Hostel Management JavaScript loaded successfully');

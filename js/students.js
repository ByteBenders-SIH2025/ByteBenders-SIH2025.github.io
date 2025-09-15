// Students Management JavaScript

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
const studentsData = [
    {
        id: 'STU001',
        firstName: 'Ajay',
        lastName: 'Verma',
        email: 'ajayverma@school.com',
        phone: '6393149489',
        class: 'Grade 11B',
        status: 'Active',
        dateOfBirth: '2006-03-22',
        gender: 'Male',
        address: 'Lucknow',
        parentName: 'Savit Ram',
        parentPhone: '00000000000',
        parentEmail: 'parent@email.com',
        admissionDate: '2021-09-01',
        photo: 'img/Ajay.jpg'
    },
    {
        id: 'STU002',
        firstName: 'Siddhant',
        lastName: 'Pathak',
        email: 'sp@school.com',
        phone: '9140951883',
        class: 'Grade 12A',
        status: 'Active',
        dateOfBirth: '2005-01-15',
        gender: 'Male',
        address: 'Lucknow',
        parentName: 'Anand Pathak',
        parentPhone: '0000000000',
        parentEmail: 'anand@email.com',
        admissionDate: '2020-09-01',
        photo: 'img/siddhant.jpg'
    },
    {
        id: 'STU003',
        firstName: 'Kanisha',
        lastName: 'Yadav',
        email: 'kanisha@school.com',
        phone: '0000000000',
        class: 'Grade 10C',
        status: 'Active',
        dateOfBirth: '2007-07-10',
        gender: 'Female',
        address: 'Lucknow',
        parentName: 'Mr. Yadav',
        parentPhone: '0000000000',
        parentEmail: 'abc@gmail.com',
        admissionDate: '2022-09-01',
        photo: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=MR'
    },
    {
        id: 'STU004',
        firstName: 'Shrishti',
        lastName: 'Shahi',
        email: 'ss@school.com',
        phone: '00000000000',
        class: 'Grade 9A',
        status: 'Active',
        dateOfBirth: '2008-11-05',
        gender: 'Female',
        address: 'Lucknow',
        parentName: '........',
        parentPhone: '00000000000',
        parentEmail: 'parent@email.com',
        admissionDate: '2023-09-01',
        photo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=SJ'
    },
    {
        id: 'STU005',
        firstName: 'Vanshika',
        lastName: 'Yadav',
        email: 'Vy@school.com',
        phone: '0000000000',
        class: 'Grade 12B',
        status: 'Graduated',
        dateOfBirth: '2004-12-18',
        gender: 'Female',
        address: '00000000000',
        parentName: '..........',
        parentPhone: '000000000',
        parentEmail: 'parent@email.com',
        admissionDate: '2019-09-01',
        photo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=JB'
    },
    {
        id: 'STU006',
        firstName: 'Agrim',
        lastName: 'Verma',
        email: 'av@school.com',
        phone: '0000000000',
        class: 'Grade 12B',
        status: 'Graduated',
        dateOfBirth: '2004-12-18',
        gender: 'Male',
        address: '00000000000',
        parentName: '..........',
        parentPhone: '000000000',
        parentEmail: 'parent@email.com',
        admissionDate: '2019-09-01',
        photo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=JB'
    }
];

// State management
let currentPage = 1;
let itemsPerPage = 25;
let filteredStudents = [...studentsData];
let selectedStudents = new Set();

// DOM Elements
const studentsTableBody = document.getElementById('studentsTableBody');
const studentSearch = document.getElementById('studentSearch');
const classFilter = document.getElementById('classFilter');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const studentDetailsModal = document.getElementById('studentDetailsModal');
const studentForm = document.getElementById('studentForm');
const selectAllCheckbox = document.getElementById('selectAll');
const totalStudents = document.getElementById('totalStudents');
const totalStudentsnav = document.getElementById('totalStudentsnav');
const activeStudents = document.getElementById('activeStudents');
const graduatingStudents = document.getElementById('graduatingStudents');
const avgGrade = document.getElementById('avgGrade');

// Initialize Students Page
document.addEventListener('DOMContentLoaded', function() {
    initializeStudentsPage();
    loadStudentsTable();
    updateStats();
    setupEventListeners();
    
    // Check for hash navigation
    if (window.location.hash === '#add') {
        setTimeout(() => {
            openAddStudentModal();
        }, 100);
    }
});

// Initialize Students Page
function initializeStudentsPage() {
    console.log('Students Management Page Initialized');
    
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
    studentSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    classFilter.addEventListener('change', handleFilter);
    
    // Add student button
    addStudentBtn.addEventListener('click', openAddStudentModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeStudentModal);
    document.getElementById('closeDetailsModal').addEventListener('click', closeStudentDetailsModal);
    document.getElementById('cancelBtn').addEventListener('click', closeStudentModal);
    document.getElementById('saveStudentBtn').addEventListener('click', saveStudent);
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', handleSelectAll);
    
    // Form submission
    studentForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Students Table
function loadStudentsTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageStudents = filteredStudents.slice(startIndex, endIndex);
    
    studentsTableBody.innerHTML = '';
    
    pageStudents.forEach(student => {
        const row = createStudentRow(student);
        studentsTableBody.appendChild(row);
    });
    
    updatePagination();
}

// Create Student Row
function createStudentRow(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="checkbox" class="student-checkbox" value="${student.id}">
        </td>
        <td>${student.id}</td>
        <td>
            <img src="${student.photo}" alt="${student.firstName} ${student.lastName}" class="student-photo">
        </td>
        <td>
            <div class="student-name">
                <strong>${student.firstName} ${student.lastName}</strong>
            </div>
        </td>
        <td>${student.class}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
            <span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" onclick="viewStudent('${student.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="editStudent('${student.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteStudent('${student.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    // Add checkbox event listener
    const checkbox = row.querySelector('.student-checkbox');
    checkbox.addEventListener('change', handleStudentSelect);
    
    return row;
}

// Handle Search
function handleSearch() {
    const searchTerm = studentSearch.value.toLowerCase();
    filteredStudents = studentsData.filter(student => 
        student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    loadStudentsTable();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedClass = classFilter.value;
    
    if (selectedClass) {
        filteredStudents = studentsData.filter(student => student.class === selectedClass);
    } else {
        filteredStudents = [...studentsData];
    }
    
    currentPage = 1;
    loadStudentsTable();
    updateStats();
}

// Handle Select All
function handleSelectAll() {
    const checkboxes = document.querySelectorAll('.student-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        if (selectAllCheckbox.checked) {
            selectedStudents.add(checkbox.value);
        } else {
            selectedStudents.delete(checkbox.value);
        }
    });
}

// Handle Student Select
function handleStudentSelect(event) {
    const studentId = event.target.value;
    
    if (event.target.checked) {
        selectedStudents.add(studentId);
    } else {
        selectedStudents.delete(studentId);
    }
    
    // Update select all checkbox
    const checkboxes = document.querySelectorAll('.student-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.student-checkbox:checked');
    selectAllCheckbox.checked = checkboxes.length === checkedCheckboxes.length;
}

// Open Add Student Modal
function openAddStudentModal() {
    document.getElementById('modalTitle').textContent = 'Add New Student';
    studentForm.reset();
    studentModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Student Modal
function closeStudentModal() {
    studentModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Student Details Modal
function closeStudentDetailsModal() {
    studentDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeStudentModal();
    closeStudentDetailsModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveStudent();
}

// Save Student
function saveStudent() {
    const formData = new FormData(studentForm);
    const studentData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateStudentForm(studentData)) {
        return;
    }
    
    // Generate student ID if adding new
    if (!studentData.studentId || studentData.studentId === '') {
        studentData.studentId = generateStudentId();
    }
    
    // Add photo URL
    studentData.photo = `https://via.placeholder.com/40x40/2563eb/ffffff?text=${studentData.firstName[0]}${studentData.lastName[0]}`;
    
    // Add to students data
    const existingIndex = studentsData.findIndex(s => s.id === studentData.studentId);
    if (existingIndex >= 0) {
        studentsData[existingIndex] = studentData;
        showNotification('Student updated successfully', 'success');
    } else {
        studentsData.push(studentData);
        showNotification('Student added successfully', 'success');
    }
    
    // Refresh table
    filteredStudents = [...studentsData];
    loadStudentsTable();
    updateStats();
    closeStudentModal();
}

// Validate Student Form
function validateStudentForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'class', 'status', 'dateOfBirth', 'gender', 'address', 'parentName', 'parentPhone'];
    
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

// Generate Student ID
function generateStudentId() {
    const lastId = studentsData.length > 0 ? 
        Math.max(...studentsData.map(s => parseInt(s.id.replace('STU', '')))) : 0;
    return `STU${String(lastId + 1).padStart(3, '0')}`;
}

// View Student
function viewStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    // Populate student details
    document.getElementById('detailPhoto').src = student.photo;
    document.getElementById('detailName').textContent = `${student.firstName} ${student.lastName}`;
    document.getElementById('detailClass').textContent = student.class;
    document.getElementById('detailId').textContent = `Student ID: ${student.id}`;
    document.getElementById('detailStatus').textContent = student.status;
    document.getElementById('detailEmail').textContent = student.email;
    document.getElementById('detailPhone').textContent = student.phone;
    document.getElementById('detailDob').textContent = formatDate(student.dateOfBirth);
    document.getElementById('detailGender').textContent = student.gender;
    document.getElementById('detailAddress').textContent = student.address;
    document.getElementById('detailParent').textContent = student.parentName;
    document.getElementById('detailCurrentClass').textContent = student.class;
    document.getElementById('detailAdmissionDate').textContent = formatDate(student.admissionDate);
    document.getElementById('detailAcademicYear').textContent = '2023-2024';
    
    // Update status badge class
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.className = `status-badge status-${student.status.toLowerCase()}`;
    
    studentDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Edit Student
function editStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Student';
    
    // Populate form with student data
    Object.keys(student).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = student[key];
        }
    });
    
    studentModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Student
function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        const index = studentsData.findIndex(s => s.id === studentId);
        if (index >= 0) {
            studentsData.splice(index, 1);
            filteredStudents = [...studentsData];
            loadStudentsTable();
            updateStats();
            showNotification('Student deleted successfully', 'success');
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
    totalStudents.textContent = filteredStudents.length.toLocaleString();
    totalStudentsnav.textContent = filteredStudents.length.toLocaleString();
    
    const activeCount = filteredStudents.filter(s => s.status === 'Active').length;
    activeStudents.textContent = activeCount.toLocaleString();
    
    const graduatingCount = filteredStudents.filter(s => s.class.includes('Grade 12')).length;
    graduatingStudents.textContent = graduatingCount.toLocaleString();
    
    // Calculate average grade (mock data)
    const avgGradeValue = (Math.random() * 20 + 80).toFixed(1);
    avgGrade.textContent = `${avgGradeValue}%`;
}

// Update Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredStudents.length);
    
    document.getElementById('showingFrom').textContent = startIndex;
    document.getElementById('showingTo').textContent = endIndex;
    document.getElementById('totalRecords').textContent = filteredStudents.length.toLocaleString();
    
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
    loadStudentsTable();
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

// Add CSS for additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .page-content {
        padding: 2rem;
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
    
    .student-photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .student-name strong {
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
    
    .student-profile {
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
    .grades-stats {
        display: flex;
        gap: 2rem;
        margin-top: 1rem;
    }
    
    .attendance-stat,
    .grade-stat {
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
document.head.appendChild(additionalStyles);

console.log('Students Management JavaScript loaded successfully');

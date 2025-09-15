// Teachers Management JavaScript

// Sample data
const teachersData = [
    {
        id: 'TCH001',
        employeeId: 'EMP001',
        firstName: 'Raman',
        lastName: 'Yadav',
        email: 'rm@school.com',
        phone: '0000000000',
        department: 'Mathematics',
        position: 'Head of Department',
        dateOfBirth: '1985-01-15',
        gender: 'Male',
        hireDate: '2015-09-01',
        salary: 75000,
        address: 'Lucknow',
        qualifications: 'Ph.D. in Mathematics, M.Ed. in Education, B.Sc. in Mathematics',
        subjects: 'Advanced Mathematics, Calculus, Algebra, Statistics',
        photo: 'logodefault.jpeg?text=JS',
        experience: 8,
        rating: 4.8,
        status: 'Active'
    },
    {
        id: 'TCH002',
        employeeId: 'EMP002',
        firstName: 'Sneha',
        lastName: 'Verma',
        email: 'sneha@school.com',
        phone: '+1 234 567 8901',
        department: 'Science',
        position: 'Senior Teacher',
        dateOfBirth: '1982-03-22',
        gender: 'Female',
        hireDate: '2018-09-01',
        salary: 68000,
        address: 'Lucknow',
        qualifications: 'M.Sc. in Physics, B.Ed. in Science Education',
        subjects: 'Physics, Chemistry, Biology',
        photo: 'https://via.placeholder.com/120x120/10b981/ffffff?text=SJ',
        experience: 6,
        rating: 4.6,
        status: 'Active'
    },
    {
        id: 'TCH003',
        employeeId: 'EMP003',
        firstName: 'Rajat',
        lastName: 'Sharma',
        email: 'rajat@school.com',
        phone: '0000000000',
        department: 'English',
        position: 'Teacher',
        dateOfBirth: '1990-07-10',
        gender: 'Male',
        hireDate: '2020-09-01',
        salary: 55000,
        address: 'Lucknow',
        qualifications: 'M.A. in English Literature, B.Ed. in English',
        subjects: 'English Literature, Creative Writing, Grammar',
        photo: 'https://via.placeholder.com/120x120/f59e0b/ffffff?text=MB',
        experience: 4,
        rating: 4.4,
        status: 'Active'
    },
    {
        id: 'TCH004',
        employeeId: 'EMP004',
        firstName: 'Rahul',
        lastName: 'Singh',
        email: 'singh@school.com',
        phone: '0000000000',
        department: 'History',
        position: 'Teacher',
        dateOfBirth: '1988-11-05',
        gender: 'Male',
        hireDate: '2019-09-01',
        salary: 58000,
        address: 'lucknow',
        qualifications: 'M.A. in History, B.Ed. in Social Studies',
        subjects: 'World History, American History, Geography',
        photo: 'https://via.placeholder.com/120x120/8b5cf6/ffffff?text=ED',
        experience: 5,
        rating: 4.5,
        status: 'Active'
    },
    {
        id: 'TCH005',
        employeeId: 'EMP005',
        firstName: 'Suneel',
        lastName: 'Kumar',
        email: 'skumar@school.com',
        phone: '00000000',
        department: 'Physical Education',
        position: 'Senior Teacher',
        dateOfBirth: '1980-12-18',
        gender: 'Male',
        hireDate: '2012-09-01',
        salary: 62000,
        address: 'lucknow',
        qualifications: 'M.Ed. in Physical Education, B.Sc. in Sports Science',
        subjects: 'Physical Education, Sports Science, Health',
        photo: 'https://via.placeholder.com/120x120/ef4444/ffffff?text=DW',
        experience: 12,
        rating: 4.7,
        status: 'Active'
    }
];

// State management
let currentView = 'grid';
let filteredTeachers = [...teachersData];

// DOM Elements
const teachersContainer = document.getElementById('teachersContainer');
const teacherSearch = document.getElementById('teacherSearch');
const departmentFilter = document.getElementById('departmentFilter');
const addTeacherBtn = document.getElementById('addTeacherBtn');
const teacherModal = document.getElementById('teacherModal');
const teacherDetailsModal = document.getElementById('teacherDetailsModal');
const teacherForm = document.getElementById('teacherForm');
const totalTeachers = document.getElementById('totalTeachers');
const activeTeachers = document.getElementById('activeTeachers');
const avgExperience = document.getElementById('avgExperience');
const avgRating = document.getElementById('avgRating');

// Initialize Teachers Page
document.addEventListener('DOMContentLoaded', function() {
    initializeTeachersPage();
    loadTeachersGrid();
    updateStats();
    setupEventListeners();
    
    // Check for hash navigation
    if (window.location.hash === '#add') {
        setTimeout(() => {
            openAddTeacherModal();
        }, 100);
    }
});

// Initialize Teachers Page
function initializeTeachersPage() {
    console.log('Teachers Management Page Initialized');
    
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
    teacherSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    departmentFilter.addEventListener('change', handleFilter);
    
    // Add teacher button
    addTeacherBtn.addEventListener('click', openAddTeacherModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeTeacherModal);
    document.getElementById('closeDetailsModal').addEventListener('click', closeTeacherDetailsModal);
    document.getElementById('cancelBtn').addEventListener('click', closeTeacherModal);
    document.getElementById('saveTeacherBtn').addEventListener('click', saveTeacher);
    
    // Form submission
    teacherForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // View controls
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', handleViewChange);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Teachers Grid
function loadTeachersGrid() {
    teachersContainer.innerHTML = '';
    
    filteredTeachers.forEach(teacher => {
        const teacherCard = createTeacherCard(teacher);
        teachersContainer.appendChild(teacherCard);
    });
}

// Create Teacher Card
function createTeacherCard(teacher) {
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.innerHTML = `
        <div class="teacher-photo">
            <img src="${teacher.photo}" alt="${teacher.firstName} ${teacher.lastName}">
        </div>
        <div class="teacher-info">
            <h3>${teacher.firstName} ${teacher.lastName}</h3>
            <p class="teacher-position">${teacher.position}</p>
            <p class="teacher-department">${teacher.department}</p>
            <div class="teacher-stats">
                <div class="stat">
                    <i class="fas fa-star"></i>
                    <span>${teacher.rating}</span>
                </div>
                <div class="stat">
                    <i class="fas fa-calendar"></i>
                    <span>${teacher.experience}y</span>
                </div>
            </div>
            <div class="teacher-actions">
                <button class="btn-icon" onclick="viewTeacher('${teacher.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="editTeacher('${teacher.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteTeacher('${teacher.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Handle Search
function handleSearch() {
    const searchTerm = teacherSearch.value.toLowerCase();
    filteredTeachers = teachersData.filter(teacher => 
        teacher.firstName.toLowerCase().includes(searchTerm) ||
        teacher.lastName.toLowerCase().includes(searchTerm) ||
        teacher.id.toLowerCase().includes(searchTerm) ||
        teacher.email.toLowerCase().includes(searchTerm) ||
        teacher.department.toLowerCase().includes(searchTerm) ||
        teacher.subjects.toLowerCase().includes(searchTerm)
    );
    
    loadTeachersGrid();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedDepartment = departmentFilter.value;
    
    if (selectedDepartment) {
        filteredTeachers = teachersData.filter(teacher => teacher.department === selectedDepartment);
    } else {
        filteredTeachers = [...teachersData];
    }
    
    loadTeachersGrid();
    updateStats();
}

// Handle View Change
function handleViewChange(event) {
    const view = event.target.dataset.view;
    
    // Update active button
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentView = view;
    
    if (view === 'list') {
        loadTeachersList();
    } else {
        loadTeachersGrid();
    }
}

// Load Teachers List
function loadTeachersList() {
    teachersContainer.innerHTML = '';
    teachersContainer.className = 'teachers-list';
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Rating</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredTeachers.map(teacher => `
                <tr>
                    <td>
                        <img src="${teacher.photo}" alt="${teacher.firstName} ${teacher.lastName}" class="teacher-photo-small">
                    </td>
                    <td>
                        <div class="teacher-name">
                            <strong>${teacher.firstName} ${teacher.lastName}</strong>
                        </div>
                    </td>
                    <td>${teacher.department}</td>
                    <td>${teacher.position}</td>
                    <td>${teacher.email}</td>
                    <td>${teacher.experience} years</td>
                    <td>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${teacher.rating}</span>
                        </div>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewTeacher('${teacher.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="editTeacher('${teacher.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="deleteTeacher('${teacher.id}')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    teachersContainer.appendChild(table);
}

// Open Add Teacher Modal
function openAddTeacherModal() {
    document.getElementById('modalTitle').textContent = 'Add New Teacher';
    teacherForm.reset();
    teacherModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Teacher Modal
function closeTeacherModal() {
    teacherModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Teacher Details Modal
function closeTeacherDetailsModal() {
    teacherDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeTeacherModal();
    closeTeacherDetailsModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveTeacher();
}

// Save Teacher
function saveTeacher() {
    const formData = new FormData(teacherForm);
    const teacherData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateTeacherForm(teacherData)) {
        return;
    }
    
    // Generate teacher ID if adding new
    if (!teacherData.teacherId || teacherData.teacherId === '') {
        teacherData.teacherId = generateTeacherId();
    }
    
    // Generate employee ID if adding new
    if (!teacherData.employeeId || teacherData.employeeId === '') {
        teacherData.employeeId = generateEmployeeId();
    }
    
    // Add photo URL
    teacherData.photo = `https://via.placeholder.com/120x120/2563eb/ffffff?text=${teacherData.firstName[0]}${teacherData.lastName[0]}`;
    
    // Calculate experience
    const hireDate = new Date(teacherData.hireDate);
    const currentDate = new Date();
    teacherData.experience = Math.floor((currentDate - hireDate) / (365.25 * 24 * 60 * 60 * 1000));
    
    // Add default rating
    teacherData.rating = 4.0;
    teacherData.status = 'Active';
    
    // Add to teachers data
    const existingIndex = teachersData.findIndex(t => t.id === teacherData.teacherId);
    if (existingIndex >= 0) {
        teachersData[existingIndex] = teacherData;
        showNotification('Teacher updated successfully', 'success');
    } else {
        teachersData.push(teacherData);
        showNotification('Teacher added successfully', 'success');
    }
    
    // Refresh grid
    filteredTeachers = [...teachersData];
    if (currentView === 'list') {
        loadTeachersList();
    } else {
        loadTeachersGrid();
    }
    updateStats();
    closeTeacherModal();
}

// Validate Teacher Form
function validateTeacherForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'position', 'dateOfBirth', 'gender', 'hireDate', 'salary', 'address', 'qualifications', 'subjects'];
    
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
    
    // Validate salary
    if (isNaN(data.salary) || data.salary < 0) {
        showNotification('Please enter a valid salary', 'error');
        return false;
    }
    
    return true;
}

// Generate Teacher ID
function generateTeacherId() {
    const lastId = teachersData.length > 0 ? 
        Math.max(...teachersData.map(t => parseInt(t.id.replace('TCH', '')))) : 0;
    return `TCH${String(lastId + 1).padStart(3, '0')}`;
}

// Generate Employee ID
function generateEmployeeId() {
    const lastId = teachersData.length > 0 ? 
        Math.max(...teachersData.map(t => parseInt(t.employeeId.replace('EMP', '')))) : 0;
    return `EMP${String(lastId + 1).padStart(3, '0')}`;
}

// View Teacher
function viewTeacher(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;
    
    // Populate teacher details
    document.getElementById('detailPhoto').src = teacher.photo;
    document.getElementById('detailName').textContent = `${teacher.firstName} ${teacher.lastName}`;
    document.getElementById('detailPosition').textContent = teacher.position;
    document.getElementById('detailId').textContent = `Teacher ID: ${teacher.id}`;
    document.getElementById('detailEmail').textContent = teacher.email;
    document.getElementById('detailPhone').textContent = teacher.phone;
    document.getElementById('detailDob').textContent = formatDate(teacher.dateOfBirth);
    document.getElementById('detailGender').textContent = teacher.gender;
    document.getElementById('detailAddress').textContent = teacher.address;
    document.getElementById('detailEmergencyContact').textContent = 'Emergency Contact Info';
    document.getElementById('detailDepartment').textContent = teacher.department;
    document.getElementById('detailPosition').textContent = teacher.position;
    document.getElementById('detailHireDate').textContent = formatDate(teacher.hireDate);
    document.getElementById('detailSalary').textContent = `$${teacher.salary.toLocaleString()}`;
    document.getElementById('detailQualifications').textContent = teacher.qualifications;
    document.getElementById('detailSubjects').textContent = teacher.subjects;
    
    teacherDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Edit Teacher
function editTeacher(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Teacher';
    
    // Populate form with teacher data
    Object.keys(teacher).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = teacher[key];
        }
    });
    
    teacherModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Teacher
function deleteTeacher(teacherId) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        const index = teachersData.findIndex(t => t.id === teacherId);
        if (index >= 0) {
            teachersData.splice(index, 1);
            filteredTeachers = [...teachersData];
            if (currentView === 'list') {
                loadTeachersList();
            } else {
                loadTeachersGrid();
            }
            updateStats();
            showNotification('Teacher deleted successfully', 'success');
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
    totalTeachers.textContent = filteredTeachers.length;
    
    const activeCount = filteredTeachers.filter(t => t.status === 'Active').length;
    activeTeachers.textContent = activeCount;
    
    const avgExp = filteredTeachers.reduce((sum, t) => sum + t.experience, 0) / filteredTeachers.length;
    avgExperience.textContent = avgExp.toFixed(1);
    
    const avgRate = filteredTeachers.reduce((sum, t) => sum + t.rating, 0) / filteredTeachers.length;
    avgRating.textContent = avgRate.toFixed(1);
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
    
    .teachers-grid {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-top: 2rem;
    }
    
    .teachers-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .teachers-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .view-controls {
        display: flex;
        gap: 0.5rem;
    }
    
    .view-btn {
        background: none;
        border: 1px solid #d1d5db;
        color: #6b7280;
        padding: 0.5rem;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.15s ease;
    }
    
    .view-btn.active {
        background: #2563eb;
        border-color: #2563eb;
        color: white;
    }
    
    .teachers-container {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .teachers-list {
        padding: 0;
    }
    
    .teacher-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid #e5e7eb;
    }
    
    .teacher-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .teacher-photo {
        margin-bottom: 1rem;
    }
    
    .teacher-photo img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .teacher-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .teacher-position {
        margin: 0 0 0.25rem 0;
        color: #2563eb;
        font-weight: 500;
        font-size: 0.875rem;
    }
    
    .teacher-department {
        margin: 0 0 1rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .teacher-stats {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .stat i {
        color: #f59e0b;
    }
    
    .teacher-actions {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .teacher-photo-small {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .teacher-name strong {
        color: #111827;
    }
    
    .rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .rating i {
        color: #f59e0b;
        font-size: 0.875rem;
    }
    
    .profile-badges {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .badge.experience {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .badge.rating {
        background: #fef3c7;
        color: #92400e;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .professional-info h4,
    .schedule-info h4,
    .performance-info h4 {
        margin: 0 0 1rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .info-item.full-width {
        grid-column: 1 / -1;
    }
    
    .schedule-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .schedule-day h5 {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: #374151;
    }
    
    .schedule-classes {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .schedule-class {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        font-size: 0.875rem;
    }
    
    .schedule-class .time {
        color: #6b7280;
        font-weight: 500;
    }
    
    .schedule-class .subject {
        color: #111827;
        font-weight: 500;
    }
    
    .performance-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }
    
    .performance-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
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
`;
document.head.appendChild(additionalStyles);

console.log('Teachers Management JavaScript loaded successfully');

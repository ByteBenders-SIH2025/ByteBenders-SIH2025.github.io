// Subjects Management JavaScript

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

// Sample data
const subjectsData = [
    {
        id: 'SUB001',
        subjectName: 'Advanced Mathematics',
        subjectCode: 'MATH101',
        department: 'Mathematics',
        credits: 4,
        gradeLevel: 'Grade 12',
        status: 'Active',
        teacher: 'TCH001',
        teacherName: 'John Smith',
        maxStudents: 30,
        currentStudents: 28,
        description: 'Advanced topics in mathematics including calculus, linear algebra, and statistics.',
        prerequisites: 'Basic Mathematics, Algebra I, Geometry',
        academicYear: '2023-2024',
        curriculum: [
            {
                unit: 'Unit 1: Calculus Fundamentals',
                topics: ['Limits and Continuity', 'Derivatives and Applications', 'Integration Techniques']
            },
            {
                unit: 'Unit 2: Linear Algebra',
                topics: ['Vector Spaces', 'Matrix Operations', 'Eigenvalues and Eigenvectors']
            },
            {
                unit: 'Unit 3: Statistics and Probability',
                topics: ['Descriptive Statistics', 'Probability Distributions', 'Hypothesis Testing']
            }
        ]
    },
    {
        id: 'SUB002',
        subjectName: 'Physics',
        subjectCode: 'PHYS101',
        department: 'Science',
        credits: 4,
        gradeLevel: 'Grade 11',
        status: 'Active',
        teacher: 'TCH002',
        teacherName: 'Sarah Johnson',
        maxStudents: 25,
        currentStudents: 24,
        description: 'Comprehensive study of physics principles including mechanics, thermodynamics, and electromagnetism.',
        prerequisites: 'Basic Science, Mathematics',
        academicYear: '2023-2024',
        curriculum: [
            {
                unit: 'Unit 1: Mechanics',
                topics: ['Kinematics', 'Dynamics', 'Energy and Work']
            },
            {
                unit: 'Unit 2: Thermodynamics',
                topics: ['Heat and Temperature', 'Laws of Thermodynamics', 'Heat Engines']
            },
            {
                unit: 'Unit 3: Electromagnetism',
                topics: ['Electric Fields', 'Magnetic Fields', 'Electromagnetic Waves']
            }
        ]
    },
    {
        id: 'SUB003',
        subjectName: 'English Literature',
        subjectCode: 'ENG201',
        department: 'English',
        credits: 3,
        gradeLevel: 'Grade 10',
        status: 'Active',
        teacher: 'TCH003',
        teacherName: 'Michael Brown',
        maxStudents: 28,
        currentStudents: 26,
        description: 'Study of classic and contemporary English literature with focus on critical analysis.',
        prerequisites: 'Basic English, Reading Comprehension',
        academicYear: '2023-2024',
        curriculum: [
            {
                unit: 'Unit 1: Classic Literature',
                topics: ['Shakespeare', 'Victorian Novels', 'Poetry Analysis']
            },
            {
                unit: 'Unit 2: Contemporary Literature',
                topics: ['Modern Novels', 'Short Stories', 'Literary Criticism']
            },
            {
                unit: 'Unit 3: Creative Writing',
                topics: ['Narrative Techniques', 'Character Development', 'Plot Structure']
            }
        ]
    },
    {
        id: 'SUB004',
        subjectName: 'World History',
        subjectCode: 'HIST101',
        department: 'History',
        credits: 3,
        gradeLevel: 'Grade 9',
        status: 'Active',
        teacher: 'TCH004',
        teacherName: 'Emily Davis',
        maxStudents: 30,
        currentStudents: 29,
        description: 'Comprehensive study of world history from ancient civilizations to modern times.',
        prerequisites: 'Basic Social Studies',
        academicYear: '2023-2024',
        curriculum: [
            {
                unit: 'Unit 1: Ancient Civilizations',
                topics: ['Mesopotamia', 'Egypt', 'Greece and Rome']
            },
            {
                unit: 'Unit 2: Medieval Period',
                topics: ['Feudalism', 'Renaissance', 'Reformation']
            },
            {
                unit: 'Unit 3: Modern History',
                topics: ['Industrial Revolution', 'World Wars', 'Cold War']
            }
        ]
    },
    {
        id: 'SUB005',
        subjectName: 'Physical Education',
        subjectCode: 'PE101',
        department: 'Physical Education',
        credits: 2,
        gradeLevel: 'All Grades',
        status: 'Active',
        teacher: 'TCH005',
        teacherName: 'David Wilson',
        maxStudents: 25,
        currentStudents: 23,
        description: 'Physical fitness, sports, and health education for all grade levels.',
        prerequisites: 'None',
        academicYear: '2023-2024',
        curriculum: [
            {
                unit: 'Unit 1: Fitness Fundamentals',
                topics: ['Cardiovascular Health', 'Strength Training', 'Flexibility']
            },
            {
                unit: 'Unit 2: Sports and Games',
                topics: ['Team Sports', 'Individual Sports', 'Recreational Activities']
            },
            {
                unit: 'Unit 3: Health Education',
                topics: ['Nutrition', 'Mental Health', 'Injury Prevention']
            }
        ]
    }
];

// Sample classes and students data
const sampleClasses = [
    { id: 'CLS001', className: 'Grade 12A', students: 28 },
    { id: 'CLS002', className: 'Grade 11B', students: 24 },
    { id: 'CLS003', className: 'Grade 10C', students: 26 }
];

const sampleStudents = [
    { id: 'STU001', name: 'John Smith', photo: 'https://via.placeholder.com/40x40/2563eb/ffffff?text=JS' },
    { id: 'STU002', name: 'Emma Wilson', photo: 'https://via.placeholder.com/40x40/10b981/ffffff?text=EW' },
    { id: 'STU003', name: 'Michael Rodriguez', photo: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=MR' },
    { id: 'STU004', name: 'Sarah Johnson', photo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=SJ' },
    { id: 'STU005', name: 'James Brown', photo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=JB' }
];

// State management
let currentView = 'grid';
let filteredSubjects = [...subjectsData];

// DOM Elements
const subjectsContainer = document.getElementById('subjectsContainer');
const subjectSearch = document.getElementById('subjectSearch');
const departmentFilter = document.getElementById('departmentFilter');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const subjectModal = document.getElementById('subjectModal');
const subjectDetailsModal = document.getElementById('subjectDetailsModal');
const subjectForm = document.getElementById('subjectForm');
const totalSubjects = document.getElementById('totalSubjects');
const activeSubjects = document.getElementById('activeSubjects');
const avgClassesPerSubject = document.getElementById('avgClassesPerSubject');
const totalEnrollments = document.getElementById('totalEnrollments');

// Initialize Subjects Page
document.addEventListener('DOMContentLoaded', function() {
    initializeSubjectsPage();
    loadSubjectsGrid();
    updateStats();
    setupEventListeners();
});

// Initialize Subjects Page
function initializeSubjectsPage() {
    console.log('Subjects Management Page Initialized');
    
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
    subjectSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    departmentFilter.addEventListener('change', handleFilter);
    
    // Add subject button
    addSubjectBtn.addEventListener('click', openAddSubjectModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeSubjectModal);
    document.getElementById('closeDetailsModal').addEventListener('click', closeSubjectDetailsModal);
    document.getElementById('cancelBtn').addEventListener('click', closeSubjectModal);
    document.getElementById('saveSubjectBtn').addEventListener('click', saveSubject);
    
    // Form submission
    subjectForm.addEventListener('submit', handleFormSubmit);
    
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

// Load Subjects Grid
function loadSubjectsGrid() {
    subjectsContainer.innerHTML = '';
    
    filteredSubjects.forEach(subject => {
        const subjectCard = createSubjectCard(subject);
        subjectsContainer.appendChild(subjectCard);
    });
}

// Create Subject Card
function createSubjectCard(subject) {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = `
        <div class="subject-header">
            <div class="subject-icon">
                <i class="fas fa-book"></i>
            </div>
            <div class="subject-info">
                <h3>${subject.subjectName}</h3>
                <p class="subject-code">${subject.subjectCode}</p>
                <p class="subject-department">${subject.department}</p>
            </div>
        </div>
        <div class="subject-stats">
            <div class="stat">
                <i class="fas fa-graduation-cap"></i>
                <span>${subject.gradeLevel}</span>
            </div>
            <div class="stat">
                <i class="fas fa-star"></i>
                <span>${subject.credits} Credits</span>
            </div>
        </div>
        <div class="subject-enrollment">
            <div class="enrollment-info">
                <span class="enrollment-count">${subject.currentStudents}/${subject.maxStudents}</span>
                <span class="enrollment-label">Students</span>
            </div>
            <div class="enrollment-bar">
                <div class="enrollment-fill" style="width: ${(subject.currentStudents / subject.maxStudents) * 100}%"></div>
            </div>
        </div>
        <div class="subject-description">
            <p>${subject.description.substring(0, 100)}${subject.description.length > 100 ? '...' : ''}</p>
        </div>
        <div class="subject-actions">
            <button class="btn-icon" onclick="viewSubject('${subject.id}')" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" onclick="editSubject('${subject.id}')" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="deleteSubject('${subject.id}')" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Handle Search
function handleSearch() {
    const searchTerm = subjectSearch.value.toLowerCase();
    filteredSubjects = subjectsData.filter(subject => 
        subject.subjectName.toLowerCase().includes(searchTerm) ||
        subject.subjectCode.toLowerCase().includes(searchTerm) ||
        subject.department.toLowerCase().includes(searchTerm) ||
        subject.description.toLowerCase().includes(searchTerm)
    );
    
    loadSubjectsGrid();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedDepartment = departmentFilter.value;
    
    if (selectedDepartment) {
        filteredSubjects = subjectsData.filter(subject => subject.department === selectedDepartment);
    } else {
        filteredSubjects = [...subjectsData];
    }
    
    loadSubjectsGrid();
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
        loadSubjectsList();
    } else if (view === 'curriculum') {
        loadSubjectsCurriculum();
    } else {
        loadSubjectsGrid();
    }
}

// Load Subjects List
function loadSubjectsList() {
    subjectsContainer.innerHTML = '';
    subjectsContainer.className = 'subjects-list';
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Subject</th>
                <th>Department</th>
                <th>Grade Level</th>
                <th>Credits</th>
                <th>Teacher</th>
                <th>Enrollments</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredSubjects.map(subject => `
                <tr>
                    <td>
                        <div class="subject-name">
                            <strong>${subject.subjectName}</strong>
                            <span class="subject-code">${subject.subjectCode}</span>
                        </div>
                    </td>
                    <td>${subject.department}</td>
                    <td>${subject.gradeLevel}</td>
                    <td>${subject.credits}</td>
                    <td>${subject.teacherName}</td>
                    <td>${subject.currentStudents}/${subject.maxStudents}</td>
                    <td>
                        <span class="status-badge status-${subject.status.toLowerCase()}">${subject.status}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewSubject('${subject.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="editSubject('${subject.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="deleteSubject('${subject.id}')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    subjectsContainer.appendChild(table);
}

// Load Subjects Curriculum
function loadSubjectsCurriculum() {
    subjectsContainer.innerHTML = '';
    subjectsContainer.className = 'subjects-curriculum';
    
    const curriculumContainer = document.createElement('div');
    curriculumContainer.className = 'curriculum-container';
    
    curriculumContainer.innerHTML = `
        <div class="curriculum-header">
            <h4>Subject Curriculum Overview</h4>
        </div>
        <div class="curriculum-grid">
            ${filteredSubjects.map(subject => `
                <div class="curriculum-card">
                    <div class="curriculum-card-header">
                        <h5>${subject.subjectName}</h5>
                        <span class="subject-code">${subject.subjectCode}</span>
                    </div>
                    <div class="curriculum-units">
                        ${subject.curriculum.map(unit => `
                            <div class="curriculum-unit">
                                <h6>${unit.unit}</h6>
                                <ul>
                                    ${unit.topics.map(topic => `<li>${topic}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    subjectsContainer.appendChild(curriculumContainer);
}

// Open Add Subject Modal
function openAddSubjectModal() {
    document.getElementById('modalTitle').textContent = 'Add New Subject';
    subjectForm.reset();
    subjectModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Subject Modal
function closeSubjectModal() {
    subjectModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Subject Details Modal
function closeSubjectDetailsModal() {
    subjectDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeSubjectModal();
    closeSubjectDetailsModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveSubject();
}

// Save Subject
function saveSubject() {
    const formData = new FormData(subjectForm);
    const subjectData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateSubjectForm(subjectData)) {
        return;
    }
    
    // Generate subject ID if adding new
    if (!subjectData.subjectId || subjectData.subjectId === '') {
        subjectData.id = generateSubjectId();
    }
    
    // Get teacher name
    const teacherSelect = document.getElementById('teacher');
    const selectedTeacher = teacherSelect.options[teacherSelect.selectedIndex];
    subjectData.teacherName = selectedTeacher.textContent.split(' - ')[0];
    
    // Set default values
    subjectData.currentStudents = 0;
    subjectData.academicYear = '2023-2024';
    subjectData.curriculum = []; // Empty curriculum
    
    // Add to subjects data
    const existingIndex = subjectsData.findIndex(s => s.id === subjectData.id);
    if (existingIndex >= 0) {
        subjectsData[existingIndex] = subjectData;
        showNotification('Subject updated successfully', 'success');
    } else {
        subjectsData.push(subjectData);
        showNotification('Subject added successfully', 'success');
    }
    
    // Refresh grid
    filteredSubjects = [...subjectsData];
    if (currentView === 'list') {
        loadSubjectsList();
    } else if (currentView === 'curriculum') {
        loadSubjectsCurriculum();
    } else {
        loadSubjectsGrid();
    }
    updateStats();
    closeSubjectModal();
}

// Validate Subject Form
function validateSubjectForm(data) {
    const requiredFields = ['subjectName', 'subjectCode', 'department', 'credits', 'gradeLevel', 'status', 'teacher', 'description'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate credits
    if (isNaN(data.credits) || data.credits < 1 || data.credits > 10) {
        showNotification('Credits must be between 1 and 10', 'error');
        return false;
    }
    
    return true;
}

// Generate Subject ID
function generateSubjectId() {
    const lastId = subjectsData.length > 0 ? 
        Math.max(...subjectsData.map(s => parseInt(s.id.replace('SUB', '')))) : 0;
    return `SUB${String(lastId + 1).padStart(3, '0')}`;
}

// View Subject
function viewSubject(subjectId) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    // Populate subject details
    document.getElementById('detailSubjectName').textContent = subject.subjectName;
    document.getElementById('detailSubjectCode').textContent = `Subject Code: ${subject.subjectCode}`;
    document.getElementById('detailDepartment').textContent = `Department: ${subject.department}`;
    document.getElementById('detailStatus').textContent = subject.status;
    document.getElementById('detailCredits').textContent = `${subject.credits} Credits`;
    document.getElementById('detailGradeLevel').textContent = subject.gradeLevel;
    document.getElementById('detailCreditsValue').textContent = subject.credits;
    document.getElementById('detailTeacher').textContent = subject.teacherName;
    document.getElementById('detailMaxStudents').textContent = subject.maxStudents;
    document.getElementById('detailCurrentStudents').textContent = subject.currentStudents;
    document.getElementById('detailAcademicYear').textContent = subject.academicYear;
    document.getElementById('detailDescription').textContent = subject.description;
    document.getElementById('detailPrerequisites').textContent = subject.prerequisites;
    
    // Update status badge class
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.className = `badge status status-${subject.status.toLowerCase()}`;
    
    // Load subject classes and students
    loadSubjectClasses(subject.id);
    loadSubjectStudents(subject.id);
    
    subjectDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Load Subject Classes
function loadSubjectClasses(subjectId) {
    const classesList = document.getElementById('subjectClassesList');
    classesList.innerHTML = '';
    
    // Use sample classes for demo
    sampleClasses.forEach(classItem => {
        const classCard = document.createElement('div');
        classCard.className = 'class-card';
        classCard.innerHTML = `
            <div class="class-info">
                <h6>${classItem.className}</h6>
                <span class="class-students">${classItem.students} students</span>
            </div>
        `;
        classesList.appendChild(classCard);
    });
}

// Load Subject Students
function loadSubjectStudents(subjectId) {
    const studentsGrid = document.getElementById('subjectStudentsGrid');
    studentsGrid.innerHTML = '';
    
    // Use sample students for demo
    sampleStudents.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <img src="${student.photo}" alt="${student.name}" class="student-photo">
            <div class="student-name">${student.name}</div>
        `;
        studentsGrid.appendChild(studentCard);
    });
}

// Edit Subject
function editSubject(subjectId) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Subject';
    
    // Populate form with subject data
    Object.keys(subject).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = subject[key];
        }
    });
    
    subjectModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Subject
function deleteSubject(subjectId) {
    if (confirm('Are you sure you want to delete this subject?')) {
        const index = subjectsData.findIndex(s => s.id === subjectId);
        if (index >= 0) {
            subjectsData.splice(index, 1);
            filteredSubjects = [...subjectsData];
            if (currentView === 'list') {
                loadSubjectsList();
            } else if (currentView === 'curriculum') {
                loadSubjectsCurriculum();
            } else {
                loadSubjectsGrid();
            }
            updateStats();
            showNotification('Subject deleted successfully', 'success');
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
    totalSubjects.textContent = filteredSubjects.length;
    
    const activeCount = filteredSubjects.filter(s => s.status === 'Active').length;
    activeSubjects.textContent = activeCount;
    
    const avgClasses = (filteredSubjects.length / 3).toFixed(1);
    avgClassesPerSubject.textContent = avgClasses;
    
    const totalEnroll = filteredSubjects.reduce((sum, s) => sum + s.currentStudents, 0);
    totalEnrollments.textContent = totalEnroll.toLocaleString();
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
    
    .subjects-grid {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-top: 2rem;
    }
    
    .subjects-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .subjects-header h3 {
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
    
    .subjects-container {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }
    
    .subjects-list,
    .subjects-curriculum {
        padding: 0;
    }
    
    .subject-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        transition: all 0.3s ease;
        border: 1px solid #e5e7eb;
    }
    
    .subject-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .subject-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .subject-icon {
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
    
    .subject-info h3 {
        margin: 0 0 0.25rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .subject-code {
        margin: 0 0 0.25rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .subject-department {
        margin: 0;
        color: #2563eb;
        font-weight: 500;
        font-size: 0.875rem;
    }
    
    .subject-stats {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: white;
        border-radius: 0.5rem;
    }
    
    .stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .stat i {
        color: #2563eb;
    }
    
    .subject-enrollment {
        margin-bottom: 1rem;
    }
    
    .enrollment-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .enrollment-count {
        font-weight: 600;
        color: #111827;
    }
    
    .enrollment-label {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .enrollment-bar {
        height: 6px;
        background: #e5e7eb;
        border-radius: 3px;
        overflow: hidden;
    }
    
    .enrollment-fill {
        height: 100%;
        background: #2563eb;
        transition: width 0.3s ease;
    }
    
    .subject-description {
        margin-bottom: 1rem;
    }
    
    .subject-description p {
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0;
    }
    
    .subject-actions {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .subject-name {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .subject-name .subject-code {
        font-size: 0.75rem;
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
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-archived {
        background: #f3f4f6;
        color: #6b7280;
    }
    
    .curriculum-container {
        padding: 2rem;
    }
    
    .curriculum-header h4 {
        margin: 0 0 1.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .curriculum-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1.5rem;
    }
    
    .curriculum-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .curriculum-card-header {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .curriculum-card-header h5 {
        margin: 0 0 0.25rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .curriculum-card-header .subject-code {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .curriculum-units {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .curriculum-unit h6 {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: #374151;
    }
    
    .curriculum-unit ul {
        margin: 0;
        padding-left: 1rem;
    }
    
    .curriculum-unit li {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.25rem;
    }
    
    .curriculum-sections {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .curriculum-section h5 {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
    }
    
    .curriculum-section ul {
        margin: 0;
        padding-left: 1rem;
    }
    
    .curriculum-section li {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }
    
    .classes-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .class-card {
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .class-card h6 {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: #111827;
    }
    
    .class-students {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .students-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .student-card {
        text-align: center;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .student-card .student-photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.5rem;
    }
    
    .student-card .student-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }
    
    .badge.credits {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
`;
document.head.appendChild(additionalStyles);

console.log('Subjects Management JavaScript loaded successfully');

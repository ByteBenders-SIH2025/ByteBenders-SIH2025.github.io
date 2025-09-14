// Grades Management JavaScript

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

// Sample grades data
const gradesData = [
    {
        id: 'GRD001',
        studentId: 'STU001',
        studentName: 'John Smith',
        class: 'Grade 12A',
        subject: 'Mathematics',
        assignmentType: 'Quiz',
        assignmentName: 'Chapter 5 Quiz',
        maxPoints: 100,
        earnedPoints: 95,
        percentage: 95,
        letterGrade: 'A+',
        gradeDate: '2023-12-15',
        term: 'Q2',
        comments: 'Excellent work! Shows strong understanding of the concepts.',
        teacher: 'John Smith'
    },
    {
        id: 'GRD002',
        studentId: 'STU002',
        studentName: 'Emma Wilson',
        class: 'Grade 11B',
        subject: 'Science',
        assignmentType: 'Test',
        assignmentName: 'Physics Midterm',
        maxPoints: 100,
        earnedPoints: 88,
        percentage: 88,
        letterGrade: 'B+',
        gradeDate: '2023-12-14',
        term: 'Q2',
        comments: 'Good performance with room for improvement in problem-solving.',
        teacher: 'Sarah Johnson'
    },
    {
        id: 'GRD003',
        studentId: 'STU003',
        studentName: 'Michael Rodriguez',
        class: 'Grade 10C',
        subject: 'English',
        assignmentType: 'Project',
        assignmentName: 'Literature Analysis',
        maxPoints: 50,
        earnedPoints: 45,
        percentage: 90,
        letterGrade: 'A-',
        gradeDate: '2023-12-13',
        term: 'Q2',
        comments: 'Well-researched and well-written analysis.',
        teacher: 'Michael Brown'
    },
    {
        id: 'GRD004',
        studentId: 'STU004',
        studentName: 'Sarah Johnson',
        class: 'Grade 9A',
        subject: 'History',
        assignmentType: 'Homework',
        assignmentName: 'World War II Essay',
        maxPoints: 25,
        earnedPoints: 22,
        percentage: 88,
        letterGrade: 'B+',
        gradeDate: '2023-12-12',
        term: 'Q2',
        comments: 'Good historical analysis with accurate facts.',
        teacher: 'Emily Davis'
    },
    {
        id: 'GRD005',
        studentId: 'STU005',
        studentName: 'James Brown',
        class: 'Grade 12B',
        subject: 'Physical Education',
        assignmentType: 'Participation',
        assignmentName: 'Basketball Skills',
        maxPoints: 20,
        earnedPoints: 18,
        percentage: 90,
        letterGrade: 'A-',
        gradeDate: '2023-12-11',
        term: 'Q2',
        comments: 'Active participation and good sportsmanship.',
        teacher: 'David Wilson'
    }
];

// Sample assignments data
const assignmentsData = [
    {
        id: 'ASG001',
        title: 'Chapter 5 Quiz',
        subject: 'Mathematics',
        class: 'Grade 12A',
        type: 'Quiz',
        maxPoints: 100,
        dueDate: '2023-12-15',
        status: 'Graded',
        submissions: 28,
        averageGrade: 87.3
    },
    {
        id: 'ASG002',
        title: 'Physics Midterm',
        subject: 'Science',
        class: 'Grade 11B',
        type: 'Test',
        maxPoints: 100,
        dueDate: '2023-12-14',
        status: 'Graded',
        submissions: 24,
        averageGrade: 82.1
    },
    {
        id: 'ASG003',
        title: 'Literature Analysis',
        subject: 'English',
        class: 'Grade 10C',
        type: 'Project',
        maxPoints: 50,
        dueDate: '2023-12-13',
        status: 'Graded',
        submissions: 26,
        averageGrade: 88.5
    },
    {
        id: 'ASG004',
        title: 'World War II Essay',
        subject: 'History',
        class: 'Grade 9A',
        type: 'Homework',
        maxPoints: 25,
        dueDate: '2023-12-12',
        status: 'Graded',
        submissions: 29,
        averageGrade: 85.2
    }
];

// Sample exams data
const examsData = [
    {
        id: 'EXM001',
        title: 'Mathematics Final Exam',
        subject: 'Mathematics',
        class: 'Grade 12A',
        date: '2023-12-20',
        duration: '3 hours',
        maxPoints: 150,
        status: 'Scheduled',
        students: 28
    },
    {
        id: 'EXM002',
        title: 'Science Midterm',
        subject: 'Science',
        class: 'Grade 11B',
        date: '2023-12-18',
        duration: '2 hours',
        maxPoints: 100,
        status: 'Completed',
        students: 24
    },
    {
        id: 'EXM003',
        title: 'English Literature Exam',
        subject: 'English',
        class: 'Grade 10C',
        date: '2023-12-16',
        duration: '2.5 hours',
        maxPoints: 120,
        status: 'Completed',
        students: 26
    }
];

// State management
let currentTab = 'gradebook';
let filteredGrades = [...gradesData];

// DOM Elements
const gradebookContainer = document.getElementById('gradebookContainer');
const assignmentsGrid = document.getElementById('assignmentsGrid');
const examsGrid = document.getElementById('examsGrid');
const gradeSearch = document.getElementById('gradeSearch');
const classFilter = document.getElementById('classFilter');
const subjectFilter = document.getElementById('subjectFilter');
const addGradeBtn = document.getElementById('addGradeBtn');
const gradeModal = document.getElementById('gradeModal');
const gradeDetailsModal = document.getElementById('gradeDetailsModal');
const gradeForm = document.getElementById('gradeForm');
const avgGrade = document.getElementById('avgGrade');
const totalGrades = document.getElementById('totalGrades');
const passingRate = document.getElementById('passingRate');
const excellentGrades = document.getElementById('excellentGrades');

// Initialize Grades Page
document.addEventListener('DOMContentLoaded', function() {
    initializeGradesPage();
    loadGradebook();
    loadAssignments();
    loadExams();
    updateStats();
    setupEventListeners();
});

// Initialize Grades Page
function initializeGradesPage() {
    console.log('Grades Management Page Initialized');
    
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
    gradeSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    classFilter.addEventListener('change', handleFilter);
    subjectFilter.addEventListener('change', handleFilter);
    
    // Add grade button
    addGradeBtn.addEventListener('click', openAddGradeModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeGradeModal);
    document.getElementById('closeDetailsModal').addEventListener('click', closeGradeDetailsModal);
    document.getElementById('cancelBtn').addEventListener('click', closeGradeModal);
    document.getElementById('saveGradeBtn').addEventListener('click', saveGrade);
    
    // Form submission
    gradeForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Gradebook
function loadGradebook() {
    gradebookContainer.innerHTML = '';
    
    // Group grades by student
    const groupedGrades = groupGradesByStudent(filteredGrades);
    
    Object.keys(groupedGrades).forEach(studentName => {
        const studentGrades = groupedGrades[studentName];
        const studentCard = createStudentGradeCard(studentName, studentGrades);
        gradebookContainer.appendChild(studentCard);
    });
}

// Group Grades by Student
function groupGradesByStudent(grades) {
    return grades.reduce((groups, grade) => {
        const studentName = grade.studentName;
        if (!groups[studentName]) {
            groups[studentName] = [];
        }
        groups[studentName].push(grade);
        return groups;
    }, {});
}

// Create Student Grade Card
function createStudentGradeCard(studentName, studentGrades) {
    const student = studentGrades[0];
    const averageGrade = calculateAverageGrade(studentGrades);
    const totalPoints = studentGrades.reduce((sum, grade) => sum + grade.earnedPoints, 0);
    const maxPoints = studentGrades.reduce((sum, grade) => sum + grade.maxPoints, 0);
    
    const card = document.createElement('div');
    card.className = 'student-grade-card';
    card.innerHTML = `
        <div class="student-header">
            <div class="student-info">
                <img src="https://via.placeholder.com/40x40/2563eb/ffffff?text=${studentName.split(' ').map(n => n[0]).join('')}" alt="${studentName}" class="student-photo">
                <div class="student-details">
                    <h4>${studentName}</h4>
                    <p>${student.class} - ${student.subject}</p>
                </div>
            </div>
            <div class="grade-summary">
                <div class="average-grade">
                    <span class="grade-number">${averageGrade.toFixed(1)}%</span>
                    <span class="grade-label">Average</span>
                </div>
                <div class="points-summary">
                    <span class="points">${totalPoints}/${maxPoints}</span>
                </div>
            </div>
        </div>
        
        <div class="grades-list">
            ${studentGrades.map(grade => `
                <div class="grade-item">
                    <div class="grade-info">
                        <span class="assignment-name">${grade.assignmentName}</span>
                        <span class="assignment-type">${grade.assignmentType}</span>
                    </div>
                    <div class="grade-details">
                        <span class="points">${grade.earnedPoints}/${grade.maxPoints}</span>
                        <span class="percentage">${grade.percentage}%</span>
                        <span class="letter-grade grade-${getGradeClass(grade.letterGrade)}">${grade.letterGrade}</span>
                    </div>
                    <div class="grade-actions">
                        <button class="btn-icon" onclick="viewGrade('${grade.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="editGrade('${grade.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    return card;
}

// Calculate Average Grade
function calculateAverageGrade(grades) {
    if (grades.length === 0) return 0;
    const totalPercentage = grades.reduce((sum, grade) => sum + grade.percentage, 0);
    return totalPercentage / grades.length;
}

// Get Grade Class for Styling
function getGradeClass(letterGrade) {
    if (letterGrade.includes('A+') || letterGrade.includes('A')) return 'excellent';
    if (letterGrade.includes('B')) return 'good';
    if (letterGrade.includes('C')) return 'average';
    if (letterGrade.includes('D')) return 'below-average';
    return 'failing';
}

// Load Assignments
function loadAssignments() {
    assignmentsGrid.innerHTML = '';
    
    assignmentsData.forEach(assignment => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentsGrid.appendChild(assignmentCard);
    });
}

// Create Assignment Card
function createAssignmentCard(assignment) {
    const card = document.createElement('div');
    card.className = 'assignment-card';
    card.innerHTML = `
        <div class="assignment-header">
            <h4>${assignment.title}</h4>
            <span class="assignment-type">${assignment.type}</span>
        </div>
        <div class="assignment-info">
            <p><strong>Subject:</strong> ${assignment.subject}</p>
            <p><strong>Class:</strong> ${assignment.class}</p>
            <p><strong>Due Date:</strong> ${formatDate(assignment.dueDate)}</p>
            <p><strong>Max Points:</strong> ${assignment.maxPoints}</p>
        </div>
        <div class="assignment-stats">
            <div class="stat">
                <span class="stat-label">Submissions:</span>
                <span class="stat-value">${assignment.submissions}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Average:</span>
                <span class="stat-value">${assignment.averageGrade}%</span>
            </div>
        </div>
        <div class="assignment-status">
            <span class="status-badge status-${assignment.status.toLowerCase()}">${assignment.status}</span>
        </div>
    `;
    
    return card;
}

// Load Exams
function loadExams() {
    examsGrid.innerHTML = '';
    
    examsData.forEach(exam => {
        const examCard = createExamCard(exam);
        examsGrid.appendChild(examCard);
    });
}

// Create Exam Card
function createExamCard(exam) {
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.innerHTML = `
        <div class="exam-header">
            <h4>${exam.title}</h4>
            <span class="exam-type">Exam</span>
        </div>
        <div class="exam-info">
            <p><strong>Subject:</strong> ${exam.subject}</p>
            <p><strong>Class:</strong> ${exam.class}</p>
            <p><strong>Date:</strong> ${formatDate(exam.date)}</p>
            <p><strong>Duration:</strong> ${exam.duration}</p>
            <p><strong>Max Points:</strong> ${exam.maxPoints}</p>
        </div>
        <div class="exam-stats">
            <div class="stat">
                <span class="stat-label">Students:</span>
                <span class="stat-value">${exam.students}</span>
            </div>
        </div>
        <div class="exam-status">
            <span class="status-badge status-${exam.status.toLowerCase()}">${exam.status}</span>
        </div>
    `;
    
    return card;
}

// Handle Search
function handleSearch() {
    const searchTerm = gradeSearch.value.toLowerCase();
    filteredGrades = gradesData.filter(grade => 
        grade.studentName.toLowerCase().includes(searchTerm) ||
        grade.subject.toLowerCase().includes(searchTerm) ||
        grade.assignmentName.toLowerCase().includes(searchTerm)
    );
    
    loadGradebook();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedClass = classFilter.value;
    const selectedSubject = subjectFilter.value;
    
    filteredGrades = gradesData.filter(grade => {
        const classMatch = !selectedClass || grade.class === selectedClass;
        const subjectMatch = !selectedSubject || grade.subject === selectedSubject;
        return classMatch && subjectMatch;
    });
    
    loadGradebook();
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

// Open Add Grade Modal
function openAddGradeModal() {
    document.getElementById('modalTitle').textContent = 'Add New Grade';
    gradeForm.reset();
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('gradeDate').value = today;
    
    gradeModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Grade Modal
function closeGradeModal() {
    gradeModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Grade Details Modal
function closeGradeDetailsModal() {
    gradeDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeGradeModal();
    closeGradeDetailsModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveGrade();
}

// Save Grade
function saveGrade() {
    const formData = new FormData(gradeForm);
    const gradeData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateGradeForm(gradeData)) {
        return;
    }
    
    // Calculate percentage and letter grade
    const percentage = (gradeData.earnedPoints / gradeData.maxPoints * 100).toFixed(1);
    const letterGrade = calculateLetterGrade(percentage);
    
    // Generate grade ID
    gradeData.id = generateGradeId();
    
    // Get student name
    const studentSelect = document.getElementById('student');
    const selectedStudent = studentSelect.options[studentSelect.selectedIndex];
    gradeData.studentName = selectedStudent.textContent.split(' - ')[0];
    gradeData.class = selectedStudent.textContent.split(' - ')[1];
    
    // Set calculated values
    gradeData.percentage = parseFloat(percentage);
    gradeData.letterGrade = letterGrade;
    gradeData.teacher = 'Current Teacher'; // In real app, get from session
    
    // Add to grades data
    gradesData.push(gradeData);
    
    // Refresh display
    filteredGrades = [...gradesData];
    loadGradebook();
    updateStats();
    closeGradeModal();
    
    showNotification('Grade added successfully', 'success');
}

// Validate Grade Form
function validateGradeForm(data) {
    const requiredFields = ['student', 'subject', 'assignmentType', 'assignmentName', 'maxPoints', 'earnedPoints', 'gradeDate', 'term'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate points
    if (isNaN(data.maxPoints) || data.maxPoints < 1) {
        showNotification('Max points must be at least 1', 'error');
        return false;
    }
    
    if (isNaN(data.earnedPoints) || data.earnedPoints < 0) {
        showNotification('Earned points cannot be negative', 'error');
        return false;
    }
    
    if (parseFloat(data.earnedPoints) > parseFloat(data.maxPoints)) {
        showNotification('Earned points cannot exceed max points', 'error');
        return false;
    }
    
    return true;
}

// Calculate Letter Grade
function calculateLetterGrade(percentage) {
    const pct = parseFloat(percentage);
    if (pct >= 97) return 'A+';
    if (pct >= 93) return 'A';
    if (pct >= 90) return 'A-';
    if (pct >= 87) return 'B+';
    if (pct >= 83) return 'B';
    if (pct >= 80) return 'B-';
    if (pct >= 77) return 'C+';
    if (pct >= 73) return 'C';
    if (pct >= 70) return 'C-';
    if (pct >= 67) return 'D+';
    if (pct >= 63) return 'D';
    if (pct >= 60) return 'D-';
    return 'F';
}

// Generate Grade ID
function generateGradeId() {
    const lastId = gradesData.length > 0 ? 
        Math.max(...gradesData.map(g => parseInt(g.id.replace('GRD', '')))) : 0;
    return `GRD${String(lastId + 1).padStart(3, '0')}`;
}

// View Grade
function viewGrade(gradeId) {
    const grade = gradesData.find(g => g.id === gradeId);
    if (!grade) return;
    
    // Populate grade details
    document.getElementById('detailStudentName').textContent = grade.studentName;
    document.getElementById('detailSubject').textContent = `${grade.subject} - ${grade.class}`;
    document.getElementById('detailAssignment').textContent = grade.assignmentName;
    document.getElementById('detailGrade').textContent = grade.letterGrade;
    document.getElementById('detailPoints').textContent = `${grade.earnedPoints}/${grade.maxPoints}`;
    document.getElementById('detailAssignmentType').textContent = grade.assignmentType;
    document.getElementById('detailGradeDate').textContent = formatDate(grade.gradeDate);
    document.getElementById('detailTerm').textContent = grade.term;
    document.getElementById('detailMaxPoints').textContent = grade.maxPoints;
    document.getElementById('detailEarnedPoints').textContent = grade.earnedPoints;
    document.getElementById('detailPercentage').textContent = `${grade.percentage}%`;
    document.getElementById('detailComments').textContent = grade.comments;
    
    // Update grade badge class
    const gradeBadge = document.getElementById('detailGrade');
    gradeBadge.className = `badge grade grade-${getGradeClass(grade.letterGrade)}`;
    
    // Load grade history
    loadGradeHistory(grade.studentId, grade.subject);
    
    gradeDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Load Grade History
function loadGradeHistory(studentId, subject) {
    const historyList = document.getElementById('gradeHistoryList');
    historyList.innerHTML = '';
    
    // Get grades for this student and subject
    const studentGrades = gradesData.filter(g => g.studentId === studentId && g.subject === subject);
    
    studentGrades.forEach(grade => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-info">
                <span class="assignment-name">${grade.assignmentName}</span>
                <span class="assignment-type">${grade.assignmentType}</span>
            </div>
            <div class="history-grade">
                <span class="points">${grade.earnedPoints}/${grade.maxPoints}</span>
                <span class="percentage">${grade.percentage}%</span>
                <span class="letter-grade grade-${getGradeClass(grade.letterGrade)}">${grade.letterGrade}</span>
            </div>
            <div class="history-date">
                ${formatDate(grade.gradeDate)}
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

// Edit Grade
function editGrade(gradeId) {
    const grade = gradesData.find(g => g.id === gradeId);
    if (!grade) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Grade';
    
    // Populate form with grade data
    Object.keys(grade).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = grade[key];
        }
    });
    
    gradeModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Update Stats
function updateStats() {
    const totalGradesCount = filteredGrades.length;
    const averageGradeValue = totalGradesCount > 0 ? 
        (filteredGrades.reduce((sum, grade) => sum + grade.percentage, 0) / totalGradesCount).toFixed(1) : 0;
    
    const passingCount = filteredGrades.filter(g => g.percentage >= 60).length;
    const passingRateValue = totalGradesCount > 0 ? 
        ((passingCount / totalGradesCount) * 100).toFixed(1) : 0;
    
    const excellentCount = filteredGrades.filter(g => g.letterGrade.includes('A')).length;
    
    document.getElementById('avgGrade').textContent = `${averageGradeValue}%`;
    document.getElementById('totalGrades').textContent = totalGradesCount.toLocaleString();
    document.getElementById('passingRate').textContent = `${passingRateValue}%`;
    document.getElementById('excellentGrades').textContent = excellentCount.toLocaleString();
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
    
    .grades-tabs {
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
    
    .gradebook-grid {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .gradebook-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .gradebook-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .gradebook-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .gradebook-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .student-grade-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .student-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .student-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .student-photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .student-details h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .student-details p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .grade-summary {
        text-align: center;
    }
    
    .average-grade {
        margin-bottom: 0.5rem;
    }
    
    .grade-number {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #2563eb;
    }
    
    .grade-label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
    }
    
    .points-summary {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .grades-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .grade-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .grade-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .assignment-name {
        font-weight: 500;
        color: #111827;
    }
    
    .assignment-type {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
    }
    
    .grade-details {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .points {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .percentage {
        font-weight: 500;
        color: #111827;
    }
    
    .letter-grade {
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .grade-excellent {
        background: #dcfce7;
        color: #166534;
    }
    
    .grade-good {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .grade-average {
        background: #fef3c7;
        color: #92400e;
    }
    
    .grade-below-average {
        background: #fed7aa;
        color: #9a3412;
    }
    
    .grade-failing {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .grade-actions {
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
    
    .assignments-section,
    .exams-section {
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }
    
    .assignments-section h3,
    .exams-section h3 {
        margin: 0 0 2rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .assignments-grid,
    .exams-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }
    
    .assignment-card,
    .exam-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .assignment-card:hover,
    .exam-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .assignment-header,
    .exam-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .assignment-header h4,
    .exam-header h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .assignment-type,
    .exam-type {
        background: #2563eb;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .assignment-info,
    .exam-info {
        margin-bottom: 1rem;
    }
    
    .assignment-info p,
    .exam-info p {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .assignment-stats,
    .exam-stats {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    
    .stat {
        text-align: center;
    }
    
    .stat-label {
        display: block;
        font-size: 0.75rem;
        color: #6b7280;
        margin-bottom: 0.25rem;
    }
    
    .stat-value {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .assignment-status,
    .exam-status {
        text-align: center;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-graded,
    .status-completed {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-scheduled {
        background: #fef3c7;
        color: #92400e;
    }
    
    .reports-section {
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .reports-section h3 {
        margin: 0 0 2rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .reports-grid {
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
    
    .badge.grade {
        background: #dcfce7;
        color: #166534;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .badge.points {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .history-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1rem;
    }
    
    .history-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .history-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .history-grade {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .history-date {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .analysis-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .analysis-stat {
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

console.log('Grades Management JavaScript loaded successfully');

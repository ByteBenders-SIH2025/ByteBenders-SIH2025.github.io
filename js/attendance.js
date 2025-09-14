// Attendance Management JavaScript

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

// Sample attendance data
const attendanceData = [
    {
        id: 'ATT001',
        studentId: 'STU001',
        studentName: 'John Smith',
        class: 'Grade 12A',
        date: '2023-12-15',
        status: 'Present',
        timeIn: '08:30',
        timeOut: '15:30',
        notes: ''
    },
    {
        id: 'ATT002',
        studentId: 'STU002',
        studentName: 'Emma Wilson',
        class: 'Grade 11B',
        date: '2023-12-15',
        status: 'Present',
        timeIn: '08:25',
        timeOut: '15:25',
        notes: ''
    },
    {
        id: 'ATT003',
        studentId: 'STU003',
        studentName: 'Michael Rodriguez',
        class: 'Grade 10C',
        date: '2023-12-15',
        status: 'Late',
        timeIn: '09:15',
        timeOut: '15:30',
        notes: 'Traffic delay'
    },
    {
        id: 'ATT004',
        studentId: 'STU004',
        studentName: 'Sarah Johnson',
        class: 'Grade 9A',
        date: '2023-12-15',
        status: 'Absent',
        timeIn: null,
        timeOut: null,
        notes: 'Sick leave'
    },
    {
        id: 'ATT005',
        studentId: 'STU005',
        studentName: 'James Brown',
        class: 'Grade 12B',
        date: '2023-12-15',
        status: 'Present',
        timeIn: '08:35',
        timeOut: '15:20',
        notes: ''
    }
];

// Sample students data for attendance marking
const studentsData = [
    { id: 'STU001', name: 'John Smith', class: 'Grade 12A', photo: 'https://via.placeholder.com/40x40/2563eb/ffffff?text=JS' },
    { id: 'STU002', name: 'Emma Wilson', class: 'Grade 11B', photo: 'https://via.placeholder.com/40x40/10b981/ffffff?text=EW' },
    { id: 'STU003', name: 'Michael Rodriguez', class: 'Grade 10C', photo: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=MR' },
    { id: 'STU004', name: 'Sarah Johnson', class: 'Grade 9A', photo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=SJ' },
    { id: 'STU005', name: 'James Brown', class: 'Grade 12B', photo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=JB' },
    { id: 'STU006', name: 'Lisa Davis', class: 'Grade 12A', photo: 'https://via.placeholder.com/40x40/06b6d4/ffffff?text=LD' },
    { id: 'STU007', name: 'David Wilson', class: 'Grade 11B', photo: 'https://via.placeholder.com/40x40/84cc16/ffffff?text=DW' },
    { id: 'STU008', name: 'Maria Garcia', class: 'Grade 10C', photo: 'https://via.placeholder.com/40x40/f97316/ffffff?text=MG' }
];

// State management
let currentTab = 'daily';
let filteredAttendance = [...attendanceData];
let weeklyChart = null;
let monthlyChart = null;

// DOM Elements
const attendanceContainer = document.getElementById('attendanceContainer');
const attendanceSearch = document.getElementById('attendanceSearch');
const classFilter = document.getElementById('classFilter');
const attendanceDate = document.getElementById('attendanceDate');
const markAttendanceBtn = document.getElementById('markAttendanceBtn');
const attendanceModal = document.getElementById('attendanceModal');
const todayAttendance = document.getElementById('todayAttendance');
const presentToday = document.getElementById('presentToday');
const avgWeeklyAttendance = document.getElementById('avgWeeklyAttendance');
const attendanceTrend = document.getElementById('attendanceTrend');
const currentDateElement = document.getElementById('currentDate');

// Initialize Attendance Page
document.addEventListener('DOMContentLoaded', function() {
    initializeAttendancePage();
    loadDailyAttendance();
    updateStats();
    setupEventListeners();
    updateCurrentDate();
});

// Initialize Attendance Page
function initializeAttendancePage() {
    console.log('Attendance Management Page Initialized');
    
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
    attendanceSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    classFilter.addEventListener('change', handleFilter);
    attendanceDate.addEventListener('change', handleDateFilter);
    
    // Mark attendance button
    markAttendanceBtn.addEventListener('click', openAttendanceModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeAttendanceModal);
    document.getElementById('cancelBtn').addEventListener('click', closeAttendanceModal);
    document.getElementById('saveAttendanceBtn').addEventListener('click', saveAttendance);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Update Current Date
function updateCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = today.toLocaleDateString('en-US', options);
    attendanceDate.value = today.toISOString().split('T')[0];
}

// Load Daily Attendance
function loadDailyAttendance() {
    attendanceContainer.innerHTML = '';
    
    // Group attendance by class
    const groupedAttendance = groupAttendanceByClass(filteredAttendance);
    
    Object.keys(groupedAttendance).forEach(className => {
        const classAttendance = groupedAttendance[className];
        const classCard = createClassAttendanceCard(className, classAttendance);
        attendanceContainer.appendChild(classCard);
    });
}

// Group Attendance by Class
function groupAttendanceByClass(attendance) {
    return attendance.reduce((groups, record) => {
        const className = record.class;
        if (!groups[className]) {
            groups[className] = [];
        }
        groups[className].push(record);
        return groups;
    }, {});
}

// Create Class Attendance Card
function createClassAttendanceCard(className, classAttendance) {
    const presentCount = classAttendance.filter(a => a.status === 'Present').length;
    const lateCount = classAttendance.filter(a => a.status === 'Late').length;
    const absentCount = classAttendance.filter(a => a.status === 'Absent').length;
    const totalCount = classAttendance.length;
    const attendanceRate = totalCount > 0 ? ((presentCount + lateCount) / totalCount * 100).toFixed(1) : 0;
    
    const card = document.createElement('div');
    card.className = 'class-attendance-card';
    card.innerHTML = `
        <div class="class-header">
            <h4>${className}</h4>
            <div class="attendance-rate">
                <span class="rate-number">${attendanceRate}%</span>
                <span class="rate-label">Attendance</span>
            </div>
        </div>
        
        <div class="attendance-summary">
            <div class="summary-item present">
                <i class="fas fa-check-circle"></i>
                <span class="count">${presentCount}</span>
                <span class="label">Present</span>
            </div>
            <div class="summary-item late">
                <i class="fas fa-clock"></i>
                <span class="count">${lateCount}</span>
                <span class="label">Late</span>
            </div>
            <div class="summary-item absent">
                <i class="fas fa-times-circle"></i>
                <span class="count">${absentCount}</span>
                <span class="label">Absent</span>
            </div>
        </div>
        
        <div class="attendance-list">
            ${classAttendance.map(record => `
                <div class="attendance-item ${record.status.toLowerCase()}">
                    <div class="student-info">
                        <img src="https://via.placeholder.com/32x32/2563eb/ffffff?text=${record.studentName.split(' ').map(n => n[0]).join('')}" alt="${record.studentName}" class="student-photo">
                        <span class="student-name">${record.studentName}</span>
                    </div>
                    <div class="attendance-status">
                        <span class="status-badge status-${record.status.toLowerCase()}">${record.status}</span>
                        ${record.timeIn ? `<span class="time">${record.timeIn}</span>` : ''}
                    </div>
                    <div class="attendance-actions">
                        <button class="btn-icon" onclick="editAttendance('${record.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    return card;
}

// Handle Search
function handleSearch() {
    const searchTerm = attendanceSearch.value.toLowerCase();
    filteredAttendance = attendanceData.filter(record => 
        record.studentName.toLowerCase().includes(searchTerm) ||
        record.class.toLowerCase().includes(searchTerm)
    );
    
    loadDailyAttendance();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedClass = classFilter.value;
    
    if (selectedClass) {
        filteredAttendance = attendanceData.filter(record => record.class === selectedClass);
    } else {
        filteredAttendance = [...attendanceData];
    }
    
    loadDailyAttendance();
    updateStats();
}

// Handle Date Filter
function handleDateFilter() {
    const selectedDate = attendanceDate.value;
    
    if (selectedDate) {
        filteredAttendance = attendanceData.filter(record => record.date === selectedDate);
    } else {
        filteredAttendance = [...attendanceData];
    }
    
    loadDailyAttendance();
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
    
    // Load appropriate content
    switch(tabName) {
        case 'daily':
            loadDailyAttendance();
            break;
        case 'weekly':
            loadWeeklyReport();
            break;
        case 'monthly':
            loadMonthlyReport();
            break;
        case 'reports':
            // Reports are static, no need to load
            break;
    }
}

// Load Weekly Report
function loadWeeklyReport() {
    if (weeklyChart) {
        weeklyChart.destroy();
    }
    
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Attendance %',
            data: [92, 88, 95, 90, 94],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    weeklyChart = new Chart(ctx, {
        type: 'line',
        data: weeklyData,
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
                    }
                }
            }
        }
    });
}

// Load Monthly Report
function loadMonthlyReport() {
    if (monthlyChart) {
        monthlyChart.destroy();
    }
    
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;
    
    const monthlyData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Attendance %',
            data: [89, 92, 87, 94],
            backgroundColor: [
                'rgba(37, 99, 235, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(139, 92, 246, 0.8)'
            ],
            borderColor: [
                '#2563eb',
                '#10b981',
                '#f59e0b',
                '#8b5cf6'
            ],
            borderWidth: 2
        }]
    };
    
    monthlyChart = new Chart(ctx, {
        type: 'bar',
        data: monthlyData,
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
                    }
                }
            }
        }
    });
}

// Open Attendance Modal
function openAttendanceModal() {
    attendanceModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendanceDateInput').value = today;
    
    // Load students for attendance marking
    loadStudentsForAttendance();
}

// Load Students for Attendance
function loadStudentsForAttendance() {
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';
    
    studentsData.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-attendance-item';
        studentItem.innerHTML = `
            <div class="student-info">
                <img src="${student.photo}" alt="${student.name}" class="student-photo">
                <div class="student-details">
                    <span class="student-name">${student.name}</span>
                    <span class="student-class">${student.class}</span>
                </div>
            </div>
            <div class="attendance-options">
                <label class="attendance-option">
                    <input type="radio" name="attendance_${student.id}" value="Present" checked>
                    <span class="option-label present">Present</span>
                </label>
                <label class="attendance-option">
                    <input type="radio" name="attendance_${student.id}" value="Late">
                    <span class="option-label late">Late</span>
                </label>
                <label class="attendance-option">
                    <input type="radio" name="attendance_${student.id}" value="Absent">
                    <span class="option-label absent">Absent</span>
                </label>
            </div>
            <div class="time-inputs">
                <input type="time" class="time-input" placeholder="Time In" name="timeIn_${student.id}">
                <input type="time" class="time-input" placeholder="Time Out" name="timeOut_${student.id}">
            </div>
        `;
        attendanceList.appendChild(studentItem);
    });
}

// Close Attendance Modal
function closeAttendanceModal() {
    attendanceModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeAttendanceModal();
}

// Save Attendance
function saveAttendance() {
    const selectedClass = document.getElementById('attendanceClass').value;
    const selectedDate = document.getElementById('attendanceDateInput').value;
    
    if (!selectedClass) {
        showNotification('Please select a class', 'error');
        return;
    }
    
    // Collect attendance data
    const attendanceRecords = [];
    
    studentsData.forEach(student => {
        const statusInput = document.querySelector(`input[name="attendance_${student.id}"]:checked`);
        const timeInInput = document.querySelector(`input[name="timeIn_${student.id}"]`);
        const timeOutInput = document.querySelector(`input[name="timeOut_${student.id}"]`);
        
        if (statusInput) {
            const record = {
                id: `ATT${Date.now()}_${student.id}`,
                studentId: student.id,
                studentName: student.name,
                class: selectedClass,
                date: selectedDate,
                status: statusInput.value,
                timeIn: timeInInput ? timeInInput.value : null,
                timeOut: timeOutInput ? timeOutInput.value : null,
                notes: ''
            };
            attendanceRecords.push(record);
        }
    });
    
    // Add to attendance data
    attendanceRecords.forEach(record => {
        attendanceData.push(record);
    });
    
    // Refresh display
    filteredAttendance = [...attendanceData];
    loadDailyAttendance();
    updateStats();
    closeAttendanceModal();
    
    showNotification('Attendance marked successfully', 'success');
}

// Edit Attendance
function editAttendance(attendanceId) {
    const record = attendanceData.find(a => a.id === attendanceId);
    if (!record) return;
    
    // Simple edit - just toggle status
    const statuses = ['Present', 'Late', 'Absent'];
    const currentIndex = statuses.indexOf(record.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    record.status = statuses[nextIndex];
    
    // Refresh display
    loadDailyAttendance();
    updateStats();
    
    showNotification('Attendance updated successfully', 'success');
}

// Update Stats
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendanceData.filter(a => a.date === today);
    
    const presentCount = todayAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
    const totalCount = todayAttendance.length;
    const attendanceRate = totalCount > 0 ? (presentCount / totalCount * 100).toFixed(1) : 0;
    
    document.getElementById('todayAttendance').textContent = `${attendanceRate}%`;
    document.getElementById('presentToday').textContent = presentCount.toLocaleString();
    
    // Mock data for other stats
    document.getElementById('avgWeeklyAttendance').textContent = '92.8%';
    document.getElementById('attendanceTrend').textContent = '+3.2%';
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
    
    .attendance-tabs {
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
    
    .attendance-grid {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .attendance-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .attendance-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .attendance-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .attendance-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .class-attendance-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .class-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .class-header h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .attendance-rate {
        text-align: center;
    }
    
    .rate-number {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #2563eb;
    }
    
    .rate-label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
    }
    
    .attendance-summary {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
    }
    
    .summary-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }
    
    .summary-item i {
        font-size: 1.25rem;
    }
    
    .summary-item.present i {
        color: #10b981;
    }
    
    .summary-item.late i {
        color: #f59e0b;
    }
    
    .summary-item.absent i {
        color: #ef4444;
    }
    
    .summary-item .count {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .summary-item .label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
    }
    
    .attendance-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .attendance-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        background: white;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .attendance-item.present {
        border-left: 4px solid #10b981;
    }
    
    .attendance-item.late {
        border-left: 4px solid #f59e0b;
    }
    
    .attendance-item.absent {
        border-left: 4px solid #ef4444;
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
    
    .attendance-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-present {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-late {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-absent {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .time {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .attendance-actions {
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
    
    .weekly-report,
    .monthly-report {
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }
    
    .weekly-report h3,
    .monthly-report h3 {
        margin: 0 0 1.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .report-filters {
        margin-bottom: 2rem;
    }
    
    .weekly-chart-container,
    .monthly-chart-container {
        height: 300px;
        position: relative;
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
    
    .attendance-form {
        padding: 1rem;
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
    .form-group select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        transition: all 0.15s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .attendance-list {
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    .student-attendance-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .student-attendance-item:last-child {
        border-bottom: none;
    }
    
    .student-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .student-class {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .attendance-options {
        display: flex;
        gap: 1rem;
    }
    
    .attendance-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    
    .attendance-option input[type="radio"] {
        margin: 0;
    }
    
    .option-label {
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        transition: all 0.15s ease;
    }
    
    .option-label.present {
        color: #166534;
        background: #dcfce7;
    }
    
    .option-label.late {
        color: #92400e;
        background: #fef3c7;
    }
    
    .option-label.absent {
        color: #991b1b;
        background: #fee2e2;
    }
    
    .time-inputs {
        display: flex;
        gap: 0.5rem;
    }
    
    .time-input {
        width: 100px;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
    }
    
    .date-picker-container {
        position: relative;
    }
    
    .date-picker {
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        background: white;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(additionalStyles);

console.log('Attendance Management JavaScript loaded successfully');

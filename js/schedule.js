// Schedule Management JavaScript

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

// Sample schedule data
const scheduleData = [
    {
        id: 'SCH001',
        class: 'Grade 12A',
        subject: 'Mathematics',
        teacher: 'John Smith',
        room: 'Room 101',
        day: 'Monday',
        time: '09:00',
        duration: 60,
        type: 'Regular',
        notes: 'Advanced Calculus',
        date: '2023-12-18'
    },
    {
        id: 'SCH002',
        class: 'Grade 11B',
        subject: 'Science',
        teacher: 'Sarah Johnson',
        room: 'Lab 1',
        day: 'Monday',
        time: '10:30',
        duration: 90,
        type: 'Regular',
        notes: 'Physics Lab',
        date: '2023-12-18'
    },
    {
        id: 'SCH003',
        class: 'Grade 10C',
        subject: 'English',
        teacher: 'Michael Brown',
        room: 'Room 201',
        day: 'Tuesday',
        time: '08:00',
        duration: 60,
        type: 'Regular',
        notes: 'Literature Analysis',
        date: '2023-12-19'
    },
    {
        id: 'SCH004',
        class: 'Grade 9A',
        subject: 'History',
        teacher: 'Emily Davis',
        room: 'Room 102',
        day: 'Tuesday',
        time: '11:00',
        duration: 60,
        type: 'Regular',
        notes: 'World War II',
        date: '2023-12-19'
    },
    {
        id: 'SCH005',
        class: 'Grade 12B',
        subject: 'Physical Education',
        teacher: 'David Wilson',
        room: 'Gymnasium',
        day: 'Wednesday',
        time: '14:00',
        duration: 60,
        type: 'Regular',
        notes: 'Basketball Practice',
        date: '2023-12-20'
    }
];

// Sample rooms data
const roomsData = [
    {
        id: 'RM001',
        name: 'Room 101',
        capacity: 30,
        type: 'Classroom',
        equipment: ['Whiteboard', 'Projector', 'Computer'],
        status: 'Available',
        location: 'Building A - 1st Floor'
    },
    {
        id: 'RM002',
        name: 'Room 102',
        capacity: 25,
        type: 'Classroom',
        equipment: ['Whiteboard', 'Projector'],
        status: 'Available',
        location: 'Building A - 1st Floor'
    },
    {
        id: 'RM003',
        name: 'Lab 1',
        capacity: 20,
        type: 'Laboratory',
        equipment: ['Computers', 'Projector', 'Lab Equipment'],
        status: 'In Use',
        location: 'Building B - 2nd Floor'
    },
    {
        id: 'RM004',
        name: 'Gymnasium',
        capacity: 100,
        type: 'Sports Hall',
        equipment: ['Basketball Court', 'Volleyball Net', 'Sound System'],
        status: 'Available',
        location: 'Building C - Ground Floor'
    }
];

// State management
let currentTab = 'calendar';
let filteredSchedules = [...scheduleData];
let currentDate = new Date();

// DOM Elements
const scheduleSearch = document.getElementById('scheduleSearch');
const classFilter = document.getElementById('classFilter');
const addScheduleBtn = document.getElementById('addScheduleBtn');
const scheduleModal = document.getElementById('scheduleModal');
const scheduleForm = document.getElementById('scheduleForm');
const calendarGrid = document.getElementById('calendarGrid');
const timetableGrid = document.getElementById('timetableGrid');
const roomsGrid = document.getElementById('roomsGrid');
const conflictsList = document.getElementById('conflictsList');
const currentMonthElement = document.getElementById('currentMonth');
const conflictCount = document.getElementById('conflictCount');

// Initialize Schedule Page
document.addEventListener('DOMContentLoaded', function() {
    initializeSchedulePage();
    loadCalendar();
    loadTimetable();
    loadRooms();
    loadConflicts();
    updateStats();
    setupEventListeners();
});

// Initialize Schedule Page
function initializeSchedulePage() {
    console.log('Schedule Management Page Initialized');
    
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
    scheduleSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    classFilter.addEventListener('change', handleFilter);
    
    // Add schedule button
    addScheduleBtn.addEventListener('click', openAddScheduleModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeScheduleModal);
    document.getElementById('cancelBtn').addEventListener('click', closeScheduleModal);
    document.getElementById('saveScheduleBtn').addEventListener('click', saveSchedule);
    
    // Form submission
    scheduleForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Calendar controls
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        loadCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        loadCalendar();
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Calendar
function loadCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Generate calendar grid
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-schedules" id="day-${day}">
                <!-- Schedules will be loaded here -->
            </div>
        `;
        
        // Add schedules for this day
        const daySchedules = getSchedulesForDay(year, month, day);
        const daySchedulesContainer = dayCell.querySelector('.day-schedules');
        
        daySchedules.forEach(schedule => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = `schedule-item ${schedule.type.toLowerCase()}`;
            scheduleItem.innerHTML = `
                <div class="schedule-time">${schedule.time}</div>
                <div class="schedule-class">${schedule.class}</div>
                <div class="schedule-subject">${schedule.subject}</div>
            `;
            daySchedulesContainer.appendChild(scheduleItem);
        });
        
        calendarGrid.appendChild(dayCell);
    }
}

// Get schedules for a specific day
function getSchedulesForDay(year, month, day) {
    const targetDate = new Date(year, month, day);
    const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    return filteredSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.getDate() === day && 
               scheduleDate.getMonth() === month && 
               scheduleDate.getFullYear() === year;
    });
}

// Load Timetable
function loadTimetable() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    
    timetableGrid.innerHTML = '';
    
    // Create header row
    const headerRow = document.createElement('div');
    headerRow.className = 'timetable-row header';
    headerRow.innerHTML = '<div class="time-slot">Time</div>';
    
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        headerRow.appendChild(dayHeader);
    });
    
    timetableGrid.appendChild(headerRow);
    
    // Create time slot rows
    timeSlots.forEach(time => {
        const timeRow = document.createElement('div');
        timeRow.className = 'timetable-row';
        
        const timeCell = document.createElement('div');
        timeCell.className = 'time-slot';
        timeCell.textContent = time;
        timeRow.appendChild(timeCell);
        
        days.forEach(day => {
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            
            const daySchedules = filteredSchedules.filter(schedule => 
                schedule.day === day && schedule.time === time
            );
            
            daySchedules.forEach(schedule => {
                const scheduleItem = document.createElement('div');
                scheduleItem.className = `schedule-item ${schedule.type.toLowerCase()}`;
                scheduleItem.innerHTML = `
                    <div class="schedule-class">${schedule.class}</div>
                    <div class="schedule-subject">${schedule.subject}</div>
                    <div class="schedule-teacher">${schedule.teacher}</div>
                    <div class="schedule-room">${schedule.room}</div>
                `;
                dayCell.appendChild(scheduleItem);
            });
            
            timeRow.appendChild(dayCell);
        });
        
        timetableGrid.appendChild(timeRow);
    });
}

// Load Rooms
function loadRooms() {
    roomsGrid.innerHTML = '';
    
    roomsData.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <div class="room-header">
                <h4>${room.name}</h4>
                <span class="room-type">${room.type}</span>
            </div>
            <div class="room-info">
                <p><strong>Capacity:</strong> ${room.capacity} students</p>
                <p><strong>Location:</strong> ${room.location}</p>
                <p><strong>Equipment:</strong> ${room.equipment.join(', ')}</p>
            </div>
            <div class="room-status">
                <span class="status-badge status-${room.status.toLowerCase().replace(' ', '-')}">${room.status}</span>
            </div>
            <div class="room-actions">
                <button class="btn-icon" onclick="editRoom('${room.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="viewRoomSchedule('${room.id}')" title="View Schedule">
                    <i class="fas fa-calendar"></i>
                </button>
            </div>
        `;
        roomsGrid.appendChild(roomCard);
    });
}

// Load Conflicts
function loadConflicts() {
    const conflicts = detectConflicts();
    conflictCount.textContent = conflicts.length;
    
    conflictsList.innerHTML = '';
    
    if (conflicts.length === 0) {
        const noConflicts = document.createElement('div');
        noConflicts.className = 'no-conflicts';
        noConflicts.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h4>No Conflicts Found</h4>
            <p>All schedules are properly organized with no overlapping conflicts.</p>
        `;
        conflictsList.appendChild(noConflicts);
        return;
    }
    
    conflicts.forEach(conflict => {
        const conflictItem = document.createElement('div');
        conflictItem.className = 'conflict-item';
        conflictItem.innerHTML = `
            <div class="conflict-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="conflict-details">
                <h4>${conflict.type} Conflict</h4>
                <p>${conflict.description}</p>
                <div class="conflict-schedules">
                    ${conflict.schedules.map(schedule => `
                        <div class="conflict-schedule">
                            <span class="schedule-class">${schedule.class}</span>
                            <span class="schedule-subject">${schedule.subject}</span>
                            <span class="schedule-time">${schedule.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="conflict-actions">
                <button class="btn btn-secondary" onclick="resolveConflict('${conflict.id}')">Resolve</button>
            </div>
        `;
        conflictsList.appendChild(conflictItem);
    });
}

// Detect conflicts in schedules
function detectConflicts() {
    const conflicts = [];
    
    // Check for room conflicts
    const roomConflicts = {};
    filteredSchedules.forEach(schedule => {
        const key = `${schedule.day}-${schedule.time}-${schedule.room}`;
        if (!roomConflicts[key]) {
            roomConflicts[key] = [];
        }
        roomConflicts[key].push(schedule);
    });
    
    Object.keys(roomConflicts).forEach(key => {
        if (roomConflicts[key].length > 1) {
            conflicts.push({
                id: `room-${key}`,
                type: 'Room',
                description: `Multiple classes scheduled in ${roomConflicts[key][0].room} at ${roomConflicts[key][0].time}`,
                schedules: roomConflicts[key]
            });
        }
    });
    
    // Check for teacher conflicts
    const teacherConflicts = {};
    filteredSchedules.forEach(schedule => {
        const key = `${schedule.day}-${schedule.time}-${schedule.teacher}`;
        if (!teacherConflicts[key]) {
            teacherConflicts[key] = [];
        }
        teacherConflicts[key].push(schedule);
    });
    
    Object.keys(teacherConflicts).forEach(key => {
        if (teacherConflicts[key].length > 1) {
            conflicts.push({
                id: `teacher-${key}`,
                type: 'Teacher',
                description: `Teacher ${teacherConflicts[key][0].teacher} has multiple classes at ${teacherConflicts[key][0].time}`,
                schedules: teacherConflicts[key]
            });
        }
    });
    
    return conflicts;
}

// Handle Search
function handleSearch() {
    const searchTerm = scheduleSearch.value.toLowerCase();
    filteredSchedules = scheduleData.filter(schedule => 
        schedule.class.toLowerCase().includes(searchTerm) ||
        schedule.subject.toLowerCase().includes(searchTerm) ||
        schedule.teacher.toLowerCase().includes(searchTerm) ||
        schedule.room.toLowerCase().includes(searchTerm)
    );
    
    loadCalendar();
    loadTimetable();
    loadConflicts();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedClass = classFilter.value;
    
    if (selectedClass) {
        filteredSchedules = scheduleData.filter(schedule => schedule.class === selectedClass);
    } else {
        filteredSchedules = [...scheduleData];
    }
    
    loadCalendar();
    loadTimetable();
    loadConflicts();
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

// Open Add Schedule Modal
function openAddScheduleModal() {
    document.getElementById('modalTitle').textContent = 'Add New Schedule';
    scheduleForm.reset();
    scheduleModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Schedule Modal
function closeScheduleModal() {
    scheduleModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeScheduleModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveSchedule();
}

// Save Schedule
function saveSchedule() {
    const formData = new FormData(scheduleForm);
    const scheduleData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateScheduleForm(scheduleData)) {
        return;
    }
    
    // Generate schedule ID
    scheduleData.id = generateScheduleId();
    
    // Set date based on day
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(scheduleData.day);
    const today = new Date();
    const daysUntilTarget = (dayIndex - today.getDay() + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    scheduleData.date = targetDate.toISOString().split('T')[0];
    
    // Add to schedule data
    scheduleData.push(scheduleData);
    
    // Refresh display
    filteredSchedules = [...scheduleData];
    loadCalendar();
    loadTimetable();
    loadConflicts();
    updateStats();
    closeScheduleModal();
    
    showNotification('Schedule added successfully', 'success');
}

// Validate Schedule Form
function validateScheduleForm(data) {
    const requiredFields = ['scheduleClass', 'scheduleSubject', 'scheduleTeacher', 'scheduleRoom', 'scheduleDay', 'scheduleTime', 'scheduleDuration', 'scheduleType'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate duration
    if (isNaN(data.scheduleDuration) || data.scheduleDuration < 30 || data.scheduleDuration > 180) {
        showNotification('Duration must be between 30 and 180 minutes', 'error');
        return false;
    }
    
    return true;
}

// Generate Schedule ID
function generateScheduleId() {
    const lastId = scheduleData.length > 0 ? 
        Math.max(...scheduleData.map(s => parseInt(s.id.replace('SCH', '')))) : 0;
    return `SCH${String(lastId + 1).padStart(3, '0')}`;
}

// Update Stats
function updateStats() {
    document.getElementById('totalSchedules').textContent = filteredSchedules.length;
    document.getElementById('activeTeachers').textContent = new Set(filteredSchedules.map(s => s.teacher)).size;
    document.getElementById('scheduledClasses').textContent = new Set(filteredSchedules.map(s => s.class)).size;
    
    const totalStudents = filteredSchedules.reduce((sum, schedule) => {
        // Mock student count based on class
        const classSizes = {
            'Grade 9A': 28, 'Grade 9B': 25, 'Grade 10A': 30, 'Grade 10B': 27,
            'Grade 11A': 29, 'Grade 11B': 26, 'Grade 12A': 28, 'Grade 12B': 24
        };
        return sum + (classSizes[schedule.class] || 25);
    }, 0);
    
    const avgClassSize = filteredSchedules.length > 0 ? (totalStudents / filteredSchedules.length).toFixed(1) : 0;
    document.getElementById('avgClassSize').textContent = avgClassSize;
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
    
    .schedule-tabs {
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
    
    .calendar-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .calendar-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .calendar-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .calendar-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .calendar-controls span {
        font-weight: 600;
        color: #111827;
        min-width: 150px;
        text-align: center;
    }
    
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background: #e5e7eb;
    }
    
    .calendar-day-header {
        background: #f9fafb;
        padding: 1rem;
        text-align: center;
        font-weight: 600;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .calendar-day {
        background: white;
        min-height: 120px;
        padding: 0.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .calendar-day.empty {
        background: #f9fafb;
    }
    
    .day-number {
        font-weight: 600;
        color: #111827;
        margin-bottom: 0.5rem;
    }
    
    .day-schedules {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .schedule-item {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.15s ease;
    }
    
    .schedule-item.regular {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .schedule-item.exam {
        background: #fef3c7;
        color: #92400e;
    }
    
    .schedule-item.event {
        background: #dcfce7;
        color: #166534;
    }
    
    .schedule-item.meeting {
        background: #f3e8ff;
        color: #7c3aed;
    }
    
    .schedule-item:hover {
        transform: scale(1.02);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .schedule-time {
        font-weight: 600;
    }
    
    .schedule-class {
        font-size: 0.625rem;
        opacity: 0.8;
    }
    
    .schedule-subject {
        font-size: 0.625rem;
        opacity: 0.8;
    }
    
    .timetable-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .timetable-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .timetable-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .timetable-grid {
        display: flex;
        flex-direction: column;
    }
    
    .timetable-row {
        display: grid;
        grid-template-columns: 100px repeat(5, 1fr);
        min-height: 60px;
    }
    
    .timetable-row.header {
        background: #f9fafb;
        font-weight: 600;
        color: #6b7280;
    }
    
    .time-slot {
        padding: 1rem;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        font-weight: 500;
    }
    
    .day-header {
        padding: 1rem;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: #111827;
    }
    
    .day-cell {
        padding: 0.5rem;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .rooms-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .rooms-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .rooms-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .rooms-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .room-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .room-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .room-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .room-header h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .room-type {
        background: #2563eb;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .room-info {
        margin-bottom: 1rem;
    }
    
    .room-info p {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .room-status {
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-available {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-in-use {
        background: #fef3c7;
        color: #92400e;
    }
    
    .room-actions {
        display: flex;
        justify-content: center;
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
    
    .conflicts-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .conflicts-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .conflicts-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .conflict-stats {
        text-align: center;
    }
    
    .conflict-count {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #ef4444;
    }
    
    .conflict-label {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .conflicts-list {
        padding: 2rem;
    }
    
    .no-conflicts {
        text-align: center;
        padding: 3rem;
        color: #6b7280;
    }
    
    .no-conflicts i {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    }
    
    .no-conflicts h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .conflict-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 0.75rem;
        margin-bottom: 1rem;
    }
    
    .conflict-icon {
        width: 40px;
        height: 40px;
        background: #ef4444;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
    }
    
    .conflict-details {
        flex: 1;
    }
    
    .conflict-details h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
    }
    
    .conflict-details p {
        margin: 0 0 1rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .conflict-schedules {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .conflict-schedule {
        background: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .conflict-actions {
        display: flex;
        gap: 0.5rem;
    }
`;
document.head.appendChild(additionalStyles);

console.log('Schedule Management JavaScript loaded successfully');



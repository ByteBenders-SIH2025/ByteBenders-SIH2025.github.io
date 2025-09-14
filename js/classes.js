// Classes Management JavaScript

// Sample data
const classesData = [
    {
        id: 'CLS001',
        className: 'Grade 12A',
        classCode: 'G12A',
        grade: 'Grade 12',
        section: 'A',
        classTeacher: 'TCH001',
        teacherName: 'John Smith',
        roomNumber: 'Room 101',
        maxStudents: 30,
        currentStudents: 28,
        status: 'Active',
        description: 'Advanced Mathematics and Science class for Grade 12 students.',
        academicYear: '2023-2024',
        createdDate: '2023-09-01',
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
        schedule: {
            'Monday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'John Smith' },
                { time: '11:00 AM - 12:00 PM', subject: 'Physics', teacher: 'Sarah Johnson' }
            ],
            'Tuesday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Chemistry', teacher: 'Sarah Johnson' },
                { time: '2:00 PM - 3:00 PM', subject: 'English', teacher: 'Michael Brown' }
            ],
            'Wednesday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'John Smith' },
                { time: '11:00 AM - 12:00 PM', subject: 'Physics', teacher: 'Sarah Johnson' }
            ],
            'Thursday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Chemistry', teacher: 'Sarah Johnson' },
                { time: '2:00 PM - 3:00 PM', subject: 'English', teacher: 'Michael Brown' }
            ],
            'Friday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'John Smith' },
                { time: '11:00 AM - 12:00 PM', subject: 'Physics', teacher: 'Sarah Johnson' }
            ]
        }
    },
    {
        id: 'CLS002',
        className: 'Grade 11B',
        classCode: 'G11B',
        grade: 'Grade 11',
        section: 'B',
        classTeacher: 'TCH002',
        teacherName: 'Sarah Johnson',
        roomNumber: 'Room 102',
        maxStudents: 25,
        currentStudents: 24,
        status: 'Active',
        description: 'Science and Mathematics focused class for Grade 11 students.',
        academicYear: '2023-2024',
        createdDate: '2023-09-01',
        subjects: ['Biology', 'Chemistry', 'Mathematics', 'English'],
        schedule: {
            'Monday': [
                { time: '10:00 AM - 11:00 AM', subject: 'Biology', teacher: 'Sarah Johnson' },
                { time: '1:00 PM - 2:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Tuesday': [
                { time: '10:00 AM - 11:00 AM', subject: 'Chemistry', teacher: 'Sarah Johnson' },
                { time: '1:00 PM - 2:00 PM', subject: 'English', teacher: 'Michael Brown' }
            ],
            'Wednesday': [
                { time: '10:00 AM - 11:00 AM', subject: 'Biology', teacher: 'Sarah Johnson' },
                { time: '1:00 PM - 2:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Thursday': [
                { time: '10:00 AM - 11:00 AM', subject: 'Chemistry', teacher: 'Sarah Johnson' },
                { time: '1:00 PM - 2:00 PM', subject: 'English', teacher: 'Michael Brown' }
            ],
            'Friday': [
                { time: '10:00 AM - 11:00 AM', subject: 'Biology', teacher: 'Sarah Johnson' },
                { time: '1:00 PM - 2:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ]
        }
    },
    {
        id: 'CLS003',
        className: 'Grade 10C',
        classCode: 'G10C',
        grade: 'Grade 10',
        section: 'C',
        classTeacher: 'TCH003',
        teacherName: 'Michael Brown',
        roomNumber: 'Room 103',
        maxStudents: 28,
        currentStudents: 26,
        status: 'Active',
        description: 'General studies class for Grade 10 students.',
        academicYear: '2023-2024',
        createdDate: '2023-09-01',
        subjects: ['English', 'Mathematics', 'History', 'Science'],
        schedule: {
            'Monday': [
                { time: '8:00 AM - 9:00 AM', subject: 'English', teacher: 'Michael Brown' },
                { time: '12:00 PM - 1:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Tuesday': [
                { time: '8:00 AM - 9:00 AM', subject: 'History', teacher: 'Emily Davis' },
                { time: '12:00 PM - 1:00 PM', subject: 'Science', teacher: 'Sarah Johnson' }
            ],
            'Wednesday': [
                { time: '8:00 AM - 9:00 AM', subject: 'English', teacher: 'Michael Brown' },
                { time: '12:00 PM - 1:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Thursday': [
                { time: '8:00 AM - 9:00 AM', subject: 'History', teacher: 'Emily Davis' },
                { time: '12:00 PM - 1:00 PM', subject: 'Science', teacher: 'Sarah Johnson' }
            ],
            'Friday': [
                { time: '8:00 AM - 9:00 AM', subject: 'English', teacher: 'Michael Brown' },
                { time: '12:00 PM - 1:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ]
        }
    },
    {
        id: 'CLS004',
        className: 'Grade 9A',
        classCode: 'G9A',
        grade: 'Grade 9',
        section: 'A',
        classTeacher: 'TCH004',
        teacherName: 'Emily Davis',
        roomNumber: 'Room 104',
        maxStudents: 30,
        currentStudents: 29,
        status: 'Active',
        description: 'Foundation class for Grade 9 students.',
        academicYear: '2023-2024',
        createdDate: '2023-09-01',
        subjects: ['English', 'Mathematics', 'Science', 'History'],
        schedule: {
            'Monday': [
                { time: '9:00 AM - 10:00 AM', subject: 'English', teacher: 'Michael Brown' },
                { time: '11:00 AM - 12:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Tuesday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Science', teacher: 'Sarah Johnson' },
                { time: '11:00 AM - 12:00 PM', subject: 'History', teacher: 'Emily Davis' }
            ],
            'Wednesday': [
                { time: '9:00 AM - 10:00 AM', subject: 'English', teacher: 'Michael Brown' },
                { time: '11:00 AM - 12:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Thursday': [
                { time: '9:00 AM - 10:00 AM', subject: 'Science', teacher: 'Sarah Johnson' },
                { time: '11:00 AM - 12:00 PM', subject: 'History', teacher: 'Emily Davis' }
            ],
            'Friday': [
                { time: '9:00 AM - 10:00 AM', subject: 'English', teacher: 'Michael Brown' },
                { time: '11:00 AM - 12:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ]
        }
    },
    {
        id: 'CLS005',
        className: 'Grade 12B',
        classCode: 'G12B',
        grade: 'Grade 12',
        section: 'B',
        classTeacher: 'TCH005',
        teacherName: 'David Wilson',
        roomNumber: 'Room 105',
        maxStudents: 25,
        currentStudents: 23,
        status: 'Active',
        description: 'Physical Education and Sports Science class for Grade 12 students.',
        academicYear: '2023-2024',
        createdDate: '2023-09-01',
        subjects: ['Physical Education', 'Sports Science', 'Health', 'Mathematics'],
        schedule: {
            'Monday': [
                { time: '2:00 PM - 3:00 PM', subject: 'Physical Education', teacher: 'David Wilson' },
                { time: '3:00 PM - 4:00 PM', subject: 'Sports Science', teacher: 'David Wilson' }
            ],
            'Tuesday': [
                { time: '2:00 PM - 3:00 PM', subject: 'Health', teacher: 'David Wilson' },
                { time: '3:00 PM - 4:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Wednesday': [
                { time: '2:00 PM - 3:00 PM', subject: 'Physical Education', teacher: 'David Wilson' },
                { time: '3:00 PM - 4:00 PM', subject: 'Sports Science', teacher: 'David Wilson' }
            ],
            'Thursday': [
                { time: '2:00 PM - 3:00 PM', subject: 'Health', teacher: 'David Wilson' },
                { time: '3:00 PM - 4:00 PM', subject: 'Mathematics', teacher: 'John Smith' }
            ],
            'Friday': [
                { time: '2:00 PM - 3:00 PM', subject: 'Physical Education', teacher: 'David Wilson' },
                { time: '3:00 PM - 4:00 PM', subject: 'Sports Science', teacher: 'David Wilson' }
            ]
        }
    }
];

// Sample students data for class details
const sampleStudents = [
    { id: 'STU001', name: 'John Smith', photo: 'https://via.placeholder.com/40x40/2563eb/ffffff?text=JS' },
    { id: 'STU002', name: 'Emma Wilson', photo: 'https://via.placeholder.com/40x40/10b981/ffffff?text=EW' },
    { id: 'STU003', name: 'Michael Rodriguez', photo: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=MR' },
    { id: 'STU004', name: 'Sarah Johnson', photo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=SJ' },
    { id: 'STU005', name: 'James Brown', photo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=JB' }
];

// State management
let currentView = 'grid';
let filteredClasses = [...classesData];

// DOM Elements
const classesContainer = document.getElementById('classesContainer');
const classSearch = document.getElementById('classSearch');
const gradeFilter = document.getElementById('gradeFilter');
const addClassBtn = document.getElementById('addClassBtn');
const classModal = document.getElementById('classModal');
const classDetailsModal = document.getElementById('classDetailsModal');
const classForm = document.getElementById('classForm');
const totalClasses = document.getElementById('totalClasses');
const avgClassSize = document.getElementById('avgClassSize');
const activeClasses = document.getElementById('activeClasses');
const avgAttendance = document.getElementById('avgAttendance');

// Initialize Classes Page
document.addEventListener('DOMContentLoaded', function() {
    initializeClassesPage();
    loadClassesGrid();
    updateStats();
    setupEventListeners();
});

// Initialize Classes Page
function initializeClassesPage() {
    console.log('Classes Management Page Initialized');
    
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
    classSearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    gradeFilter.addEventListener('change', handleFilter);
    
    // Add class button
    addClassBtn.addEventListener('click', openAddClassModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeClassModal);
    document.getElementById('closeDetailsModal').addEventListener('click', closeClassDetailsModal);
    document.getElementById('cancelBtn').addEventListener('click', closeClassModal);
    document.getElementById('saveClassBtn').addEventListener('click', saveClass);
    
    // Form submission
    classForm.addEventListener('submit', handleFormSubmit);
    
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

// Load Classes Grid
function loadClassesGrid() {
    classesContainer.innerHTML = '';
    
    filteredClasses.forEach(classItem => {
        const classCard = createClassCard(classItem);
        classesContainer.appendChild(classCard);
    });
}

// Create Class Card
function createClassCard(classItem) {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.innerHTML = `
        <div class="class-header">
            <div class="class-icon">
                <i class="fas fa-school"></i>
            </div>
            <div class="class-info">
                <h3>${classItem.className}</h3>
                <p class="class-code">${classItem.classCode}</p>
                <p class="class-teacher">${classItem.teacherName}</p>
            </div>
        </div>
        <div class="class-stats">
            <div class="stat">
                <i class="fas fa-users"></i>
                <span>${classItem.currentStudents}/${classItem.maxStudents}</span>
            </div>
            <div class="stat">
                <i class="fas fa-map-marker-alt"></i>
                <span>${classItem.roomNumber}</span>
            </div>
        </div>
        <div class="class-subjects">
            ${classItem.subjects.slice(0, 3).map(subject => 
                `<span class="subject-tag">${subject}</span>`
            ).join('')}
            ${classItem.subjects.length > 3 ? `<span class="subject-more">+${classItem.subjects.length - 3} more</span>` : ''}
        </div>
        <div class="class-actions">
            <button class="btn-icon" onclick="viewClass('${classItem.id}')" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" onclick="editClass('${classItem.id}')" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="deleteClass('${classItem.id}')" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Handle Search
function handleSearch() {
    const searchTerm = classSearch.value.toLowerCase();
    filteredClasses = classesData.filter(classItem => 
        classItem.className.toLowerCase().includes(searchTerm) ||
        classItem.classCode.toLowerCase().includes(searchTerm) ||
        classItem.teacherName.toLowerCase().includes(searchTerm) ||
        classItem.roomNumber.toLowerCase().includes(searchTerm) ||
        classItem.subjects.some(subject => subject.toLowerCase().includes(searchTerm))
    );
    
    loadClassesGrid();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedGrade = gradeFilter.value;
    
    if (selectedGrade) {
        filteredClasses = classesData.filter(classItem => classItem.grade === selectedGrade);
    } else {
        filteredClasses = [...classesData];
    }
    
    loadClassesGrid();
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
        loadClassesList();
    } else if (view === 'schedule') {
        loadClassesSchedule();
    } else {
        loadClassesGrid();
    }
}

// Load Classes List
function loadClassesList() {
    classesContainer.innerHTML = '';
    classesContainer.className = 'classes-list';
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Class</th>
                <th>Teacher</th>
                <th>Room</th>
                <th>Students</th>
                <th>Subjects</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredClasses.map(classItem => `
                <tr>
                    <td>
                        <div class="class-name">
                            <strong>${classItem.className}</strong>
                            <span class="class-code">${classItem.classCode}</span>
                        </div>
                    </td>
                    <td>${classItem.teacherName}</td>
                    <td>${classItem.roomNumber}</td>
                    <td>${classItem.currentStudents}/${classItem.maxStudents}</td>
                    <td>
                        <div class="subjects-list">
                            ${classItem.subjects.slice(0, 2).map(subject => 
                                `<span class="subject-tag small">${subject}</span>`
                            ).join('')}
                            ${classItem.subjects.length > 2 ? `<span class="subject-more">+${classItem.subjects.length - 2}</span>` : ''}
                        </div>
                    </td>
                    <td>
                        <span class="status-badge status-${classItem.status.toLowerCase()}">${classItem.status}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="viewClass('${classItem.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="editClass('${classItem.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="deleteClass('${classItem.id}')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    classesContainer.appendChild(table);
}

// Load Classes Schedule
function loadClassesSchedule() {
    classesContainer.innerHTML = '';
    classesContainer.className = 'classes-schedule';
    
    const scheduleContainer = document.createElement('div');
    scheduleContainer.className = 'schedule-container';
    
    // Create time slots
    const timeSlots = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    scheduleContainer.innerHTML = `
        <div class="schedule-header">
            <h4>Weekly Class Schedule</h4>
        </div>
        <div class="schedule-grid">
            <div class="time-column">
                <div class="time-header">Time</div>
                ${timeSlots.map(time => `<div class="time-slot">${time}</div>`).join('')}
            </div>
            ${days.map(day => `
                <div class="day-column">
                    <div class="day-header">${day}</div>
                    ${timeSlots.map(time => {
                        const classItem = filteredClasses.find(c => 
                            c.schedule[day] && c.schedule[day].some(slot => slot.time.includes(time.split(' ')[0]))
                        );
                        if (classItem) {
                            const schedule = classItem.schedule[day].find(slot => slot.time.includes(time.split(' ')[0]));
                            return `
                                <div class="schedule-slot">
                                    <div class="class-name">${classItem.className}</div>
                                    <div class="subject">${schedule ? schedule.subject : ''}</div>
                                    <div class="teacher">${schedule ? schedule.teacher : ''}</div>
                                </div>
                            `;
                        }
                        return '<div class="schedule-slot empty"></div>';
                    }).join('')}
                </div>
            `).join('')}
        </div>
    `;
    
    classesContainer.appendChild(scheduleContainer);
}

// Open Add Class Modal
function openAddClassModal() {
    document.getElementById('modalTitle').textContent = 'Add New Class';
    classForm.reset();
    classModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Class Modal
function closeClassModal() {
    classModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Class Details Modal
function closeClassDetailsModal() {
    classDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeClassModal();
    closeClassDetailsModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveClass();
}

// Save Class
function saveClass() {
    const formData = new FormData(classForm);
    const classData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateClassForm(classData)) {
        return;
    }
    
    // Generate class ID if adding new
    if (!classData.classId || classData.classId === '') {
        classData.id = generateClassId();
    }
    
    // Get teacher name
    const teacherSelect = document.getElementById('classTeacher');
    const selectedTeacher = teacherSelect.options[teacherSelect.selectedIndex];
    classData.teacherName = selectedTeacher.textContent.split(' - ')[0];
    
    // Set default values
    classData.currentStudents = 0;
    classData.academicYear = '2023-2024';
    classData.createdDate = new Date().toISOString().split('T')[0];
    classData.subjects = ['Mathematics', 'English', 'Science']; // Default subjects
    classData.schedule = {}; // Empty schedule
    
    // Add to classes data
    const existingIndex = classesData.findIndex(c => c.id === classData.id);
    if (existingIndex >= 0) {
        classesData[existingIndex] = classData;
        showNotification('Class updated successfully', 'success');
    } else {
        classesData.push(classData);
        showNotification('Class added successfully', 'success');
    }
    
    // Refresh grid
    filteredClasses = [...classesData];
    if (currentView === 'list') {
        loadClassesList();
    } else if (currentView === 'schedule') {
        loadClassesSchedule();
    } else {
        loadClassesGrid();
    }
    updateStats();
    closeClassModal();
}

// Validate Class Form
function validateClassForm(data) {
    const requiredFields = ['className', 'classCode', 'grade', 'section', 'classTeacher', 'roomNumber', 'maxStudents', 'status'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate max students
    if (isNaN(data.maxStudents) || data.maxStudents < 1 || data.maxStudents > 50) {
        showNotification('Max students must be between 1 and 50', 'error');
        return false;
    }
    
    return true;
}

// Generate Class ID
function generateClassId() {
    const lastId = classesData.length > 0 ? 
        Math.max(...classesData.map(c => parseInt(c.id.replace('CLS', '')))) : 0;
    return `CLS${String(lastId + 1).padStart(3, '0')}`;
}

// View Class
function viewClass(classId) {
    const classItem = classesData.find(c => c.id === classId);
    if (!classItem) return;
    
    // Populate class details
    document.getElementById('detailClassName').textContent = classItem.className;
    document.getElementById('detailClassCode').textContent = `Class Code: ${classItem.classCode}`;
    document.getElementById('detailGrade').textContent = `${classItem.grade} - Section ${classItem.section}`;
    document.getElementById('detailStatus').textContent = classItem.status;
    document.getElementById('detailStudentCount').textContent = `${classItem.currentStudents} Students`;
    document.getElementById('detailClassTeacher').textContent = classItem.teacherName;
    document.getElementById('detailRoomNumber').textContent = classItem.roomNumber;
    document.getElementById('detailMaxStudents').textContent = classItem.maxStudents;
    document.getElementById('detailCurrentStudents').textContent = classItem.currentStudents;
    document.getElementById('detailAcademicYear').textContent = classItem.academicYear;
    document.getElementById('detailCreatedDate').textContent = formatDate(classItem.createdDate);
    document.getElementById('detailDescription').textContent = classItem.description;
    
    // Update status badge class
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.className = `badge status status-${classItem.status.toLowerCase()}`;
    
    // Load class students
    loadClassStudents(classItem.id);
    
    // Load class schedule
    loadClassSchedule(classItem.id);
    
    classDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Load Class Students
function loadClassStudents(classId) {
    const studentsGrid = document.getElementById('classStudentsGrid');
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

// Load Class Schedule
function loadClassSchedule(classId) {
    const classItem = classesData.find(c => c.id === classId);
    if (!classItem) return;
    
    const scheduleTableBody = document.getElementById('scheduleTableBody');
    scheduleTableBody.innerHTML = '';
    
    const timeSlots = [
        '8:00 AM - 9:00 AM',
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM'
    ];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    timeSlots.forEach(timeSlot => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${timeSlot}</td>
            ${days.map(day => {
                const schedule = classItem.schedule[day]?.find(s => s.time === timeSlot);
                return `<td>${schedule ? `${schedule.subject}<br><small>${schedule.teacher}</small>` : '-'}</td>`;
            }).join('')}
        `;
        scheduleTableBody.appendChild(row);
    });
}

// Edit Class
function editClass(classId) {
    const classItem = classesData.find(c => c.id === classId);
    if (!classItem) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Class';
    
    // Populate form with class data
    Object.keys(classItem).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = classItem[key];
        }
    });
    
    classModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Class
function deleteClass(classId) {
    if (confirm('Are you sure you want to delete this class?')) {
        const index = classesData.findIndex(c => c.id === classId);
        if (index >= 0) {
            classesData.splice(index, 1);
            filteredClasses = [...classesData];
            if (currentView === 'list') {
                loadClassesList();
            } else if (currentView === 'schedule') {
                loadClassesSchedule();
            } else {
                loadClassesGrid();
            }
            updateStats();
            showNotification('Class deleted successfully', 'success');
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
    totalClasses.textContent = filteredClasses.length;
    
    const activeCount = filteredClasses.filter(c => c.status === 'Active').length;
    activeClasses.textContent = activeCount;
    
    const avgSize = filteredClasses.reduce((sum, c) => sum + c.currentStudents, 0) / filteredClasses.length;
    avgClassSize.textContent = Math.round(avgSize);
    
    // Mock attendance data
    const avgAtt = (Math.random() * 10 + 90).toFixed(1);
    avgAttendance.textContent = `${avgAtt}%`;
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
    
    .classes-grid {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-top: 2rem;
    }
    
    .classes-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .classes-header h3 {
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
    
    .classes-container {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }
    
    .classes-list,
    .classes-schedule {
        padding: 0;
    }
    
    .class-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        transition: all 0.3s ease;
        border: 1px solid #e5e7eb;
    }
    
    .class-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .class-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .class-icon {
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
    
    .class-info h3 {
        margin: 0 0 0.25rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .class-code {
        margin: 0 0 0.25rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .class-teacher {
        margin: 0;
        color: #2563eb;
        font-weight: 500;
        font-size: 0.875rem;
    }
    
    .class-stats {
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
    
    .class-subjects {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .subject-tag {
        background: #e0e7ff;
        color: #3730a3;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .subject-tag.small {
        font-size: 0.625rem;
        padding: 0.125rem 0.5rem;
    }
    
    .subject-more {
        color: #6b7280;
        font-size: 0.75rem;
        font-style: italic;
    }
    
    .class-actions {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .class-name {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .class-name .class-code {
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .subjects-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
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
    
    .status-graduated {
        background: #e0e7ff;
        color: #3730a3;
    }
    
    .schedule-container {
        padding: 2rem;
    }
    
    .schedule-header h4 {
        margin: 0 0 1.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .schedule-grid {
        display: grid;
        grid-template-columns: 120px repeat(5, 1fr);
        gap: 1px;
        background: #e5e7eb;
        border-radius: 0.5rem;
        overflow: hidden;
    }
    
    .time-column,
    .day-column {
        background: white;
    }
    
    .time-header,
    .day-header {
        background: #f3f4f6;
        padding: 1rem;
        font-weight: 600;
        color: #374151;
        text-align: center;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .time-slot {
        padding: 0.75rem;
        border-bottom: 1px solid #e5e7eb;
        font-size: 0.875rem;
        color: #6b7280;
        text-align: center;
    }
    
    .schedule-slot {
        padding: 0.75rem;
        border-bottom: 1px solid #e5e7eb;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .schedule-slot.empty {
        background: #f9fafb;
    }
    
    .schedule-slot .class-name {
        font-weight: 600;
        color: #111827;
        font-size: 0.875rem;
    }
    
    .schedule-slot .subject {
        color: #6b7280;
        font-size: 0.75rem;
    }
    
    .schedule-slot .teacher {
        color: #9ca3af;
        font-size: 0.75rem;
    }
    
    .class-profile {
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
    
    .class-icon {
        width: 120px;
        height: 120px;
        background: #2563eb;
        color: white;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
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
    
    .profile-badges {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .badge.status {
        background: #dcfce7;
        color: #166534;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .badge.students {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
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
    
    .schedule-table {
        margin-top: 1rem;
        overflow-x: auto;
    }
    
    .schedule-table table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .schedule-table th,
    .schedule-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .schedule-table th {
        background: #f9fafb;
        font-weight: 600;
        color: #374151;
        font-size: 0.875rem;
    }
    
    .schedule-table td {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .schedule-table small {
        color: #9ca3af;
    }
    
    .attendance-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .attendance-stat {
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

console.log('Classes Management JavaScript loaded successfully');



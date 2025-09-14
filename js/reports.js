// Reports Management JavaScript

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

// Sample custom reports data
const customReportsData = [
    {
        id: 'CR001',
        name: 'Monthly Student Analysis',
        category: 'Academic',
        frequency: 'Monthly',
        format: 'PDF',
        description: 'Comprehensive analysis of student performance and attendance',
        dataSources: ['students', 'grades', 'attendance'],
        createdAt: '2023-12-01',
        lastGenerated: '2023-12-15',
        status: 'Active'
    },
    {
        id: 'CR002',
        name: 'Financial Summary Report',
        category: 'Financial',
        frequency: 'Monthly',
        format: 'Excel',
        description: 'Monthly financial summary with revenue and expense breakdown',
        dataSources: ['finance'],
        createdAt: '2023-11-15',
        lastGenerated: '2023-12-01',
        status: 'Active'
    },
    {
        id: 'CR003',
        name: 'Teacher Performance Review',
        category: 'Performance',
        frequency: 'Quarterly',
        format: 'PDF',
        description: 'Quarterly review of teacher performance and student feedback',
        dataSources: ['students', 'grades'],
        createdAt: '2023-10-01',
        lastGenerated: '2023-12-01',
        status: 'Active'
    }
];

// State management
let currentTab = 'overview';
let charts = {};

// DOM Elements
const reportPeriod = document.getElementById('reportPeriod');
const reportType = document.getElementById('reportType');
const generateReportBtn = document.getElementById('generateReportBtn');
const customReportModal = document.getElementById('customReportModal');
const customReportForm = document.getElementById('customReportForm');
const createCustomReportBtn = document.getElementById('createCustomReportBtn');
const customReportsGrid = document.getElementById('customReportsGrid');
const totalReports = document.getElementById('totalReports');
const dataPoints = document.getElementById('dataPoints');
const insights = document.getElementById('insights');
const accuracy = document.getElementById('accuracy');

// Initialize Reports Page
document.addEventListener('DOMContentLoaded', function() {
    initializeReportsPage();
    loadCustomReports();
    loadCharts();
    updateStats();
    setupEventListeners();
});

// Initialize Reports Page
function initializeReportsPage() {
    console.log('Reports Management Page Initialized');
    
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
    
    // Filter functionality
    reportPeriod.addEventListener('change', handlePeriodChange);
    reportType.addEventListener('change', handleTypeChange);
    
    // Generate report button
    generateReportBtn.addEventListener('click', handleGenerateReport);
    
    // Create custom report button
    createCustomReportBtn.addEventListener('click', openCustomReportModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeCustomReportModal);
    document.getElementById('cancelBtn').addEventListener('click', closeCustomReportModal);
    document.getElementById('saveCustomReportBtn').addEventListener('click', saveCustomReport);
    
    // Form submission
    customReportForm.addEventListener('submit', handleFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Refresh data button
    document.getElementById('refreshDataBtn').addEventListener('click', refreshData);
    document.getElementById('exportAllBtn').addEventListener('click', exportAllReports);
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Custom Reports
function loadCustomReports() {
    customReportsGrid.innerHTML = '';
    
    customReportsData.forEach(report => {
        const reportCard = document.createElement('div');
        reportCard.className = 'custom-report-card';
        reportCard.innerHTML = `
            <div class="report-header">
                <h4>${report.name}</h4>
                <span class="report-status status-${report.status.toLowerCase()}">${report.status}</span>
            </div>
            <div class="report-info">
                <div class="report-meta">
                    <span class="report-category">${report.category}</span>
                    <span class="report-frequency">${report.frequency}</span>
                    <span class="report-format">${report.format}</span>
                </div>
                <p class="report-description">${report.description}</p>
                <div class="report-sources">
                    <strong>Data Sources:</strong>
                    <span class="sources-list">${report.dataSources.join(', ')}</span>
                </div>
            </div>
            <div class="report-actions">
                <button class="btn btn-primary" onclick="generateCustomReport('${report.id}')">
                    <i class="fas fa-play"></i>
                    Generate
                </button>
                <button class="btn btn-secondary" onclick="editCustomReport('${report.id}')">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button class="btn btn-secondary" onclick="deleteCustomReport('${report.id}')">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
            <div class="report-footer">
                <small>Created: ${formatDate(report.createdAt)}</small>
                <small>Last Generated: ${formatDate(report.lastGenerated)}</small>
            </div>
        `;
        customReportsGrid.appendChild(reportCard);
    });
}

// Load Charts
function loadCharts() {
    loadPerformanceChart();
    loadAttendanceChart();
    loadFinancialChart();
    loadDistributionChart();
}

// Load Performance Chart
function loadPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    if (charts.performance) {
        charts.performance.destroy();
    }
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Average Grade',
            data: [85, 87, 89, 88, 91, 93],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    charts.performance = new Chart(ctx, {
        type: 'line',
        data: data,
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
                    max: 100
                }
            }
        }
    });
}

// Load Attendance Chart
function loadAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;
    
    if (charts.attendance) {
        charts.attendance.destroy();
    }
    
    const data = {
        labels: ['Present', 'Late', 'Absent'],
        datasets: [{
            data: [85, 10, 5],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 0
        }]
    };
    
    charts.attendance = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load Financial Chart
function loadFinancialChart() {
    const ctx = document.getElementById('financialChart');
    if (!ctx) return;
    
    if (charts.financial) {
        charts.financial.destroy();
    }
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue',
            data: [45000, 52000, 48000, 61000, 55000, 67000],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: '#10b981',
            borderWidth: 2
        }, {
            label: 'Expenses',
            data: [35000, 38000, 36000, 42000, 39000, 45000],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: '#ef4444',
            borderWidth: 2
        }]
    };
    
    charts.financial = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Load Distribution Chart
function loadDistributionChart() {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;
    
    if (charts.distribution) {
        charts.distribution.destroy();
    }
    
    const data = {
        labels: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
        datasets: [{
            data: [320, 280, 310, 290],
            backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
            borderWidth: 0
        }]
    };
    
    charts.distribution = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Handle Period Change
function handlePeriodChange() {
    const period = reportPeriod.value;
    showNotification(`Report period changed to ${period}`, 'info');
    // Refresh charts with new period data
    loadCharts();
}

// Handle Type Change
function handleTypeChange() {
    const type = reportType.value;
    showNotification(`Report type filtered to ${type}`, 'info');
}

// Handle Generate Report
function handleGenerateReport() {
    const period = reportPeriod.value;
    const type = reportType.value;
    
    showNotification(`Generating ${type} report for ${period}...`, 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
    }, 2000);
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
    
    // Load charts when switching to overview
    if (tabName === 'overview') {
        loadCharts();
    }
}

// Generate Report (for report cards)
function generateReport(reportType) {
    showNotification(`Generating ${reportType} report...`, 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showNotification(`${reportType} report generated successfully!`, 'success');
    }, 2000);
}

// Open Custom Report Modal
function openCustomReportModal() {
    customReportModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Custom Report Modal
function closeCustomReportModal() {
    customReportModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeCustomReportModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveCustomReport();
}

// Save Custom Report
function saveCustomReport() {
    const formData = new FormData(customReportForm);
    const reportData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateCustomReportForm(reportData)) {
        return;
    }
    
    // Get selected data sources
    const dataSources = Array.from(document.querySelectorAll('input[name="dataSources"]:checked'))
        .map(input => input.value);
    
    if (dataSources.length === 0) {
        showNotification('Please select at least one data source', 'error');
        return;
    }
    
    // Generate report ID
    reportData.id = generateCustomReportId();
    reportData.dataSources = dataSources;
    reportData.createdAt = new Date().toISOString().split('T')[0];
    reportData.lastGenerated = new Date().toISOString().split('T')[0];
    reportData.status = 'Active';
    
    // Add to custom reports data
    customReportsData.push(reportData);
    
    // Refresh display
    loadCustomReports();
    closeCustomReportModal();
    
    showNotification('Custom report created successfully', 'success');
}

// Validate Custom Report Form
function validateCustomReportForm(data) {
    const requiredFields = ['reportName', 'reportCategory', 'reportFrequency', 'reportFormat'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    return true;
}

// Generate Custom Report ID
function generateCustomReportId() {
    const lastId = customReportsData.length > 0 ? 
        Math.max(...customReportsData.map(r => parseInt(r.id.replace('CR', '')))) : 0;
    return `CR${String(lastId + 1).padStart(3, '0')}`;
}

// Generate Custom Report
function generateCustomReport(reportId) {
    const report = customReportsData.find(r => r.id === reportId);
    if (!report) return;
    
    showNotification(`Generating ${report.name}...`, 'info');
    
    // Update last generated date
    report.lastGenerated = new Date().toISOString().split('T')[0];
    
    // Simulate report generation
    setTimeout(() => {
        showNotification(`${report.name} generated successfully!`, 'success');
    }, 2000);
}

// Edit Custom Report
function editCustomReport(reportId) {
    const report = customReportsData.find(r => r.id === reportId);
    if (!report) return;
    
    // Populate form with report data
    document.getElementById('reportName').value = report.name;
    document.getElementById('reportCategory').value = report.category;
    document.getElementById('reportFrequency').value = report.frequency;
    document.getElementById('reportFormat').value = report.format;
    document.getElementById('reportDescription').value = report.description;
    
    // Check data sources
    document.querySelectorAll('input[name="dataSources"]').forEach(input => {
        input.checked = report.dataSources.includes(input.value);
    });
    
    openCustomReportModal();
}

// Delete Custom Report
function deleteCustomReport(reportId) {
    if (confirm('Are you sure you want to delete this custom report?')) {
        const index = customReportsData.findIndex(r => r.id === reportId);
        if (index >= 0) {
            customReportsData.splice(index, 1);
            loadCustomReports();
            showNotification('Custom report deleted successfully', 'success');
        }
    }
}

// Refresh Data
function refreshData() {
    showNotification('Refreshing data...', 'info');
    
    // Simulate data refresh
    setTimeout(() => {
        loadCharts();
        updateStats();
        showNotification('Data refreshed successfully', 'success');
    }, 1500);
}

// Export All Reports
function exportAllReports() {
    showNotification('Exporting all reports...', 'info');
    
    // Simulate export
    setTimeout(() => {
        showNotification('All reports exported successfully', 'success');
    }, 2000);
}

// Update Stats
function updateStats() {
    document.getElementById('totalReports').textContent = customReportsData.length + 12; // 12 predefined reports
    document.getElementById('dataPoints').textContent = '15,678';
    document.getElementById('insights').textContent = '12';
    document.getElementById('accuracy').textContent = '98.5%';
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
    
    .reports-tabs {
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
    
    .overview-container,
    .academic-reports-container,
    .financial-reports-container,
    .custom-reports-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .overview-header,
    .academic-header,
    .financial-header,
    .custom-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .overview-header h3,
    .academic-header h3,
    .financial-header h3,
    .custom-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }
    
    .overview-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .overview-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
    }
    
    .chart-container {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    
    .chart-container h4 {
        margin: 0 0 1rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .chart-container canvas {
        max-height: 300px;
    }
    
    .reports-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }
    
    .report-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
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
        margin-bottom: 1rem;
    }
    
    .report-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .report-content p {
        margin: 0 0 1rem 0;
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.5;
    }
    
    .report-meta {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .report-type,
    .report-frequency {
        background: #e5e7eb;
        color: #6b7280;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .custom-reports-grid {
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1.5rem;
    }
    
    .custom-report-card {
        background: #f9fafb;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .custom-report-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .report-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .report-header h4 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .report-status {
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
    
    .report-info {
        margin-bottom: 1.5rem;
    }
    
    .report-meta {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .report-category,
    .report-frequency,
    .report-format {
        background: #e5e7eb;
        color: #6b7280;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .report-description {
        margin: 0 0 1rem 0;
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.5;
    }
    
    .report-sources {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .sources-list {
        color: #111827;
        font-weight: 500;
    }
    
    .report-actions {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .report-actions .btn {
        flex: 1;
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
    }
    
    .report-footer {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #6b7280;
    }
    
    .checkbox-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin-top: 0.5rem;
    }
    
    .checkbox-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    
    .checkbox-item input[type="checkbox"] {
        margin: 0;
    }
    
    .checkbox-item span {
        font-size: 0.875rem;
        color: #374151;
    }
`;
document.head.appendChild(additionalStyles);

console.log('Reports Management JavaScript loaded successfully');



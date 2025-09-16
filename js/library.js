// Library Management JavaScript

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
const booksData = [
    {
        isbn: '978-0-123456-78-9',
        title: 'Introduction to Computer Science',
        author: 'John Smith',
        publisher: 'Tech Publishers',
        category: 'Science',
        publicationYear: 2023,
        totalCopies: 5,
        availableCopies: 3,
        shelfLocation: 'A-1-15',
        status: 'Available',
        description: 'A comprehensive introduction to computer science concepts and programming.'
    },
    {
        isbn: '978-0-987654-32-1',
        title: 'Advanced Mathematics',
        author: 'Dr. Jane Doe',
        publisher: 'Math World',
        category: 'Mathematics',
        publicationYear: 2022,
        totalCopies: 3,
        availableCopies: 1,
        shelfLocation: 'B-2-08',
        status: 'Available',
        description: 'Advanced mathematical concepts and problem-solving techniques.'
    },
    {
        isbn: '978-0-555555-55-5',
        title: 'World History',
        author: 'Prof. Robert Johnson',
        publisher: 'History Press',
        category: 'History',
        publicationYear: 2021,
        totalCopies: 4,
        availableCopies: 4,
        shelfLocation: 'C-3-12',
        status: 'Available',
        description: 'A comprehensive overview of world history from ancient times to present.'
    },
    {
        isbn: '978-0-777777-77-7',
        title: 'English Literature',
        author: 'Dr. Sarah Wilson',
        publisher: 'Literary House',
        category: 'Literature',
        publicationYear: 2023,
        totalCopies: 6,
        availableCopies: 2,
        shelfLocation: 'D-1-05',
        status: 'Available',
        description: 'Classic and contemporary English literature analysis.'
    },
    {
        isbn: '978-0-999999-99-9',
        title: 'Physics Fundamentals',
        author: 'Dr. Michael Brown',
        publisher: 'Science Books',
        category: 'Science',
        publicationYear: 2022,
        totalCopies: 3,
        availableCopies: 0,
        shelfLocation: 'A-2-20',
        status: 'Unavailable',
        description: 'Basic principles of physics with practical examples.'
    }
];

const borrowingData = [
    {
        id: 'BOR001',
        studentId: 'STU001',
        bookIsbn: '978-0-123456-78-9',
        issueDate: '2023-11-01',
        dueDate: '2023-11-15',
        returnDate: null,
        status: 'Borrowed'
    },
    {
        id: 'BOR002',
        studentId: 'STU002',
        bookIsbn: '978-0-987654-32-1',
        issueDate: '2023-11-05',
        dueDate: '2023-11-19',
        returnDate: null,
        status: 'Borrowed'
    }
];

// State management
let currentPage = 1;
let itemsPerPage = 25;
let filteredBooks = [...booksData];
let selectedBooks = new Set();

// DOM Elements
const booksTableBody = document.getElementById('booksTableBody');
const librarySearch = document.getElementById('librarySearch');
const categoryFilter = document.getElementById('categoryFilter');
const addBookBtn = document.getElementById('addBookBtn');
const bookModal = document.getElementById('bookModal');
const bookDetailsModal = document.getElementById('bookDetailsModal');
const issueBookModal = document.getElementById('issueBookModal');
const bookForm = document.getElementById('bookForm');
const issueBookForm = document.getElementById('issueBookForm');
const selectAllCheckbox = document.getElementById('selectAll');
const totalBooks = document.getElementById('totalBooks');
const availableBooks = document.getElementById('availableBooks');
const borrowedBooks = document.getElementById('borrowedBooks');
const activeMembers = document.getElementById('activeMembers');

// Initialize Library Page
document.addEventListener('DOMContentLoaded', function() {
    initializeLibraryPage();
    loadBooksTable();
    updateStats();
    setupEventListeners();
    
    // Check for hash navigation
    if (window.location.hash === '#add') {
        setTimeout(() => {
            openAddBookModal();
        }, 100);
    }
});

// Initialize Library Page
function initializeLibraryPage() {
    console.log('Library Management Page Initialized');
    
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
    librarySearch.addEventListener('input', handleSearch);
    
    // Filter functionality
    categoryFilter.addEventListener('change', handleFilter);
    
    // Add book button
    addBookBtn.addEventListener('click', openAddBookModal);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeBookModal);
    document.getElementById('closeBookDetailsModal').addEventListener('click', closeBookDetailsModal);
    document.getElementById('closeIssueModal').addEventListener('click', closeIssueBookModal);
    document.getElementById('cancelBtn').addEventListener('click', closeBookModal);
    document.getElementById('saveBookBtn').addEventListener('click', saveBook);
    document.getElementById('cancelIssueBtn').addEventListener('click', closeIssueBookModal);
    document.getElementById('confirmIssueBtn').addEventListener('click', issueBook);
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', handleSelectAll);
    
    // Form submission
    bookForm.addEventListener('submit', handleFormSubmit);
    issueBookForm.addEventListener('submit', handleIssueFormSubmit);
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });
    
    // Overlay click
    document.getElementById('overlay').addEventListener('click', closeAllModals);
}

// Load Books Table
function loadBooksTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageBooks = filteredBooks.slice(startIndex, endIndex);
    
    booksTableBody.innerHTML = '';
    
    pageBooks.forEach(book => {
        const row = createBookRow(book);
        booksTableBody.appendChild(row);
    });
    
    updatePagination();
}

// Create Book Row
function createBookRow(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="checkbox" class="book-checkbox" value="${book.isbn}">
        </td>
        <td>${book.isbn}</td>
        <td>
            <img src="https://via.placeholder.com/40x60/2563eb/ffffff?text=Book" alt="${book.title}" class="book-cover">
        </td>
        <td>
            <div class="book-title">
                <strong>${book.title}</strong>
            </div>
        </td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${book.availableCopies}/${book.totalCopies}</td>
        <td>
            <span class="status-badge status-${book.status.toLowerCase()}">${book.status}</span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" onclick="viewBook('${book.isbn}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="editBook('${book.isbn}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteBook('${book.isbn}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    // Add checkbox event listener
    const checkbox = row.querySelector('.book-checkbox');
    checkbox.addEventListener('change', handleBookSelect);
    
    return row;
}

// Handle Search
function handleSearch() {
    const searchTerm = librarySearch.value.toLowerCase();
    filteredBooks = booksData.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    loadBooksTable();
    updateStats();
}

// Handle Filter
function handleFilter() {
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory) {
        filteredBooks = booksData.filter(book => book.category === selectedCategory);
    } else {
        filteredBooks = [...booksData];
    }
    
    currentPage = 1;
    loadBooksTable();
    updateStats();
}

// Handle Select All
function handleSelectAll() {
    const checkboxes = document.querySelectorAll('.book-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        if (selectAllCheckbox.checked) {
            selectedBooks.add(checkbox.value);
        } else {
            selectedBooks.delete(checkbox.value);
        }
    });
}

// Handle Book Select
function handleBookSelect(event) {
    const bookIsbn = event.target.value;
    
    if (event.target.checked) {
        selectedBooks.add(bookIsbn);
    } else {
        selectedBooks.delete(bookIsbn);
    }
    
    // Update select all checkbox
    const checkboxes = document.querySelectorAll('.book-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.book-checkbox:checked');
    selectAllCheckbox.checked = checkboxes.length === checkedCheckboxes.length;
}

// Open Add Book Modal
function openAddBookModal() {
    document.getElementById('modalTitle').textContent = 'Add New Book';
    bookForm.reset();
    bookModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Close Book Modal
function closeBookModal() {
    bookModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Book Details Modal
function closeBookDetailsModal() {
    bookDetailsModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close Issue Book Modal
function closeIssueBookModal() {
    issueBookModal.classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

// Close All Modals
function closeAllModals() {
    closeBookModal();
    closeBookDetailsModal();
    closeIssueBookModal();
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    saveBook();
}

// Handle Issue Form Submit
function handleIssueFormSubmit(event) {
    event.preventDefault();
    issueBook();
}

// Save Book
function saveBook() {
    const formData = new FormData(bookForm);
    const bookData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateBookForm(bookData)) {
        return;
    }
    
    // Add to books data
    const existingIndex = booksData.findIndex(b => b.isbn === bookData.isbn);
    if (existingIndex >= 0) {
        booksData[existingIndex] = bookData;
        showNotification('Book updated successfully', 'success');
    } else {
        booksData.push(bookData);
        showNotification('Book added successfully', 'success');
    }
    
    // Refresh table
    filteredBooks = [...booksData];
    loadBooksTable();
    updateStats();
    closeBookModal();
}

// Validate Book Form
function validateBookForm(data) {
    const requiredFields = ['isbn', 'title', 'author', 'publisher', 'category', 'publicationYear', 'totalCopies', 'availableCopies', 'shelfLocation', 'status'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate ISBN format (basic validation)
    const isbnRegex = /^978-\d{1}-\d{6}-\d{2}-\d$/;
    if (!isbnRegex.test(data.isbn)) {
        showNotification('Please enter a valid ISBN format (978-0-123456-78-9)', 'error');
        return false;
    }
    
    // Validate numbers
    if (parseInt(data.totalCopies) < parseInt(data.availableCopies)) {
        showNotification('Available copies cannot be more than total copies', 'error');
        return false;
    }
    
    return true;
}

// View Book
function viewBook(bookIsbn) {
    const book = booksData.find(b => b.isbn === bookIsbn);
    if (!book) return;
    
    // Populate book details
    document.getElementById('detailBookCover').src = 'https://via.placeholder.com/120x160/2563eb/ffffff?text=Book';
    document.getElementById('detailBookTitle').textContent = book.title;
    document.getElementById('detailBookAuthor').textContent = book.author;
    document.getElementById('detailBookIsbn').textContent = `ISBN: ${book.isbn}`;
    document.getElementById('detailBookStatus').textContent = book.status;
    document.getElementById('detailPublisher').textContent = book.publisher;
    document.getElementById('detailCategory').textContent = book.category;
    document.getElementById('detailPublicationYear').textContent = book.publicationYear;
    document.getElementById('detailShelfLocation').textContent = book.shelfLocation;
    document.getElementById('detailTotalCopies').textContent = book.totalCopies;
    document.getElementById('detailAvailableCopies').textContent = book.availableCopies;
    document.getElementById('detailDescription').textContent = book.description;
    
    // Update status badge class
    const statusBadge = document.getElementById('detailBookStatus');
    statusBadge.className = `status-badge status-${book.status.toLowerCase()}`;
    
    bookDetailsModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Edit Book
function editBook(bookIsbn) {
    const book = booksData.find(b => b.isbn === bookIsbn);
    if (!book) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Book';
    
    // Populate form with book data
    Object.keys(book).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = book[key];
        }
    });
    
    bookModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

// Delete Book
function deleteBook(bookIsbn) {
    if (confirm('Are you sure you want to delete this book?')) {
        const index = booksData.findIndex(b => b.isbn === bookIsbn);
        if (index >= 0) {
            booksData.splice(index, 1);
            filteredBooks = [...booksData];
            loadBooksTable();
            updateStats();
            showNotification('Book deleted successfully', 'success');
        }
    }
}

// Issue Book
function issueBook() {
    const formData = new FormData(issueBookForm);
    const issueData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateIssueForm(issueData)) {
        return;
    }
    
    // Check if book is available
    const book = booksData.find(b => b.isbn === issueData.issueBookIsbn);
    if (!book) {
        showNotification('Book not found', 'error');
        return;
    }
    
    if (book.availableCopies <= 0) {
        showNotification('No copies available for this book', 'error');
        return;
    }
    
    // Create borrowing record
    const borrowingRecord = {
        id: generateBorrowingId(),
        studentId: issueData.issueStudentId,
        bookIsbn: issueData.issueBookIsbn,
        issueDate: issueData.issueDate,
        dueDate: issueData.dueDate,
        returnDate: null,
        status: 'Borrowed'
    };
    
    borrowingData.push(borrowingRecord);
    
    // Update book availability
    book.availableCopies -= 1;
    if (book.availableCopies === 0) {
        book.status = 'Unavailable';
    }
    
    showNotification('Book issued successfully', 'success');
    closeIssueBookModal();
    loadBooksTable();
    updateStats();
}

// Validate Issue Form
function validateIssueForm(data) {
    const requiredFields = ['issueStudentId', 'issueBookIsbn', 'issueDate', 'dueDate'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate dates
    const issueDate = new Date(data.issueDate);
    const dueDate = new Date(data.dueDate);
    
    if (dueDate <= issueDate) {
        showNotification('Due date must be after issue date', 'error');
        return false;
    }
    
    return true;
}

// Generate Borrowing ID
function generateBorrowingId() {
    const lastId = borrowingData.length > 0 ? 
        Math.max(...borrowingData.map(b => parseInt(b.id.replace('BOR', '')))) : 0;
    return `BOR${String(lastId + 1).padStart(3, '0')}`;
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
    if (totalBooks) {
        totalBooks.textContent = filteredBooks.length.toLocaleString();
    }
    
    if (availableBooks) {
        const availableCount = filteredBooks.reduce((sum, book) => sum + book.availableCopies, 0);
        availableBooks.textContent = availableCount.toLocaleString();
    }
    
    if (borrowedBooks) {
        const borrowedCount = filteredBooks.reduce((sum, book) => sum + (book.totalCopies - book.availableCopies), 0);
        borrowedBooks.textContent = borrowedCount.toLocaleString();
    }
    
    if (activeMembers) {
        // Mock data for active members
        activeMembers.textContent = '150';
    }
}

// Update Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredBooks.length);
    
    document.getElementById('showingFrom').textContent = startIndex;
    document.getElementById('showingTo').textContent = endIndex;
    document.getElementById('totalRecords').textContent = filteredBooks.length.toLocaleString();
    
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
    loadBooksTable();
}

// Quick Action Functions
function openIssueBookModal() {
    issueBookForm.reset();
    // Set default dates
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 14); // 14 days from today
    
    document.getElementById('issueDate').value = today.toISOString().split('T')[0];
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    issueBookModal.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('modal-open');
}

function openReturnBookModal() {
    showNotification('Return book functionality coming soon', 'info');
}

function viewOverdueBooks() {
    showNotification('Overdue books functionality coming soon', 'info');
}

function generateLibraryReport() {
    showNotification('Library report generation coming soon', 'info');
}

// Add CSS for additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .page-content {
        padding: 2rem;
    }
    
    .quick-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .action-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .action-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
    }
    
    .action-card:nth-child(1) .action-icon {
        background: #2563eb;
    }
    
    .action-card:nth-child(2) .action-icon {
        background: #059669;
    }
    
    .action-card:nth-child(3) .action-icon {
        background: #dc2626;
    }
    
    .action-card:nth-child(4) .action-icon {
        background: #7c3aed;
    }
    
    .action-content {
        flex: 1;
    }
    
    .action-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }
    
    .action-content p {
        margin: 0 0 1rem 0;
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
    }
    
    .btn-warning {
        background: #f59e0b;
        color: white;
    }
    
    .btn-warning:hover {
        background: #d97706;
    }
    
    .btn-info {
        background: #06b6d4;
        color: white;
    }
    
    .btn-info:hover {
        background: #0891b2;
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
    
    .book-cover {
        width: 40px;
        height: 60px;
        border-radius: 4px;
        object-fit: cover;
    }
    
    .book-title strong {
        color: #111827;
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
    
    .status-unavailable {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .status-maintenance {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-lost {
        background: #f3f4f6;
        color: #374151;
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
    
    .book-profile {
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
        height: 160px;
        border-radius: 8px;
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
    
    .copies-list,
    .borrowers-list,
    .history-list {
        margin-top: 1rem;
    }
    
    .copy-item,
    .borrower-item,
    .history-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .copy-status.available {
        background: #dcfce7;
        color: #166534;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
    }
    
    .copy-status.borrowed {
        background: #fee2e2;
        color: #991b1b;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
    }
    
    .history-status.returned {
        background: #dcfce7;
        color: #166534;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
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

console.log('Library Management JavaScript loaded successfully');

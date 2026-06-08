// Local Storage Service for Student Management System

const StorageService = {
    // Initialize default students if empty
    initializeStorage: function() {
        if (!localStorage.getItem('students')) {
            const defaultStudents = [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '9876543210',
                    course: 'Computer Science',
                    batch: '2024'
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    phone: '9876543211',
                    course: 'Information Technology',
                    batch: '2024'
                }
            ];
            localStorage.setItem('students', JSON.stringify(defaultStudents));
        }
    },

    // Get all students
    getAllStudents: function() {
        const students = localStorage.getItem('students');
        return students ? JSON.parse(students) : [];
    },

    // Get student by ID
    getStudentById: function(id) {
        const students = this.getAllStudents();
        return students.find(student => student.id === parseInt(id));
    },

    // Add new student
    addStudent: function(student) {
        const students = this.getAllStudents();
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        student.id = newId;
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        return student;
    },

    // Update student
    updateStudent: function(id, updatedData) {
        const students = this.getAllStudents();
        const index = students.findIndex(student => student.id === parseInt(id));
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedData };
            localStorage.setItem('students', JSON.stringify(students));
            return students[index];
        }
        return null;
    },

    // Delete student
    deleteStudent: function(id) {
        const students = this.getAllStudents();
        const filteredStudents = students.filter(student => student.id !== parseInt(id));
        localStorage.setItem('students', JSON.stringify(filteredStudents));
        return true;
    },

    // Get total student count
    getTotalCount: function() {
        return this.getAllStudents().length;
    },

    // Search students
    searchStudents: function(query) {
        const students = this.getAllStudents();
        return students.filter(student =>
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.email.toLowerCase().includes(query.toLowerCase())
        );
    }
};

// Initialize storage when page loads
document.addEventListener('DOMContentLoaded', function() {
    StorageService.initializeStorage();
});

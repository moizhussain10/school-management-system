export const initialStudents = [
  { id: 1, name: 'Aarav Sharma', class: 'Grade 10-A', rollNo: '1001', gender: 'Male', contact: '+92 300 1234567', email: 'aarav@school.edu', status: 'Active' },
  { id: 2, name: 'Sara Khan', class: 'Grade 10-B', rollNo: '1002', gender: 'Female', contact: '+92 301 2345678', email: 'sara@school.edu', status: 'Active' },
  { id: 3, name: 'Bilal Ahmed', class: 'Grade 9-A', rollNo: '0901', gender: 'Male', contact: '+92 302 3456789', email: 'bilal@school.edu', status: 'Inactive' },
  { id: 4, name: 'Zoya Fatima', class: 'Grade 11-A', rollNo: '1101', gender: 'Female', contact: '+92 303 4567890', email: 'zoya@school.edu', status: 'Active' },
];

export const initialTeachers = [
  { id: 1, name: 'Dr. Robert Smith', subject: 'Mathematics', qualification: 'Ph.D. Math', phone: '+92 312 1112233', email: 'robert@school.edu', status: 'Active' },
  { id: 2, name: 'Ms. Clara Oswald', subject: 'English', qualification: 'M.A. Literature', phone: '+92 313 2223344', email: 'clara@school.edu', status: 'Active' },
  { id: 3, name: 'Mr. David Miller', subject: 'Physics', qualification: 'M.Sc. Physics', phone: '+92 314 3334455', email: 'david@school.edu', status: 'On Leave' },
];

export const initialClasses = [
  { id: 1, name: 'Grade 10-A', section: 'A', room: 'Room 101', capacity: 35, enrolled: 30, classTeacher: 'Dr. Robert Smith' },
  { id: 2, name: 'Grade 10-B', section: 'B', room: 'Room 102', capacity: 35, enrolled: 32, classTeacher: 'Ms. Clara Oswald' },
  { id: 3, name: 'Grade 9-A', section: 'A', room: 'Room 201', capacity: 40, enrolled: 38, classTeacher: 'Mr. David Miller' },
];

export const initialFees = [
  { id: 1, studentName: 'Aarav Sharma', rollNo: '1001', month: 'October 2026', amount: '$250', status: 'Paid', date: '2026-10-01' },
  { id: 2, studentName: 'Sara Khan', rollNo: '1002', month: 'October 2026', amount: '$250', status: 'Pending', date: '—' },
  { id: 3, studentName: 'Bilal Ahmed', rollNo: '0901', month: 'October 2026', amount: '$220', status: 'Overdue', date: '—' },
  { id: 4, studentName: 'Zoya Fatima', rollNo: '1101', month: 'October 2026', amount: '$280', status: 'Paid', date: '2026-10-02' },
];

export const initialAttendance = [
  { id: 1, studentName: 'Aarav Sharma', rollNo: '1001', class: 'Grade 10-A', status: 'Present' },
  { id: 2, studentName: 'Sara Khan', rollNo: '1002', class: 'Grade 10-B', status: 'Absent' },
  { id: 3, studentName: 'Bilal Ahmed', rollNo: '0901', class: 'Grade 9-A', status: 'Late' },
  { id: 4, studentName: 'Zoya Fatima', rollNo: '1101', class: 'Grade 11-A', status: 'Present' },
];

export const sqlSchemaCode = `-- MySQL Database Schema for School Management System

CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- 1. Classes Table
CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    room_number VARCHAR(20),
    capacity INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    subject_specialization VARCHAR(100),
    qualification VARCHAR(100),
    status ENUM('Active', 'Inactive', 'On Leave') DEFAULT 'Active',
    joined_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    date_of_birth DATE,
    class_id INT,
    guardian_contact VARCHAR(20),
    email VARCHAR(100),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
);

-- 4. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Late', 'Excused') DEFAULT 'Present',
    remarks VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_date (student_id, date)
);

-- 5. Fee Payments Table
CREATE TABLE IF NOT EXISTS fee_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    month_year VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);`;

export const expressApiCode = `// Node.js Express REST API Controller Sample
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL connection pool

// GET all students with class names
router.get('/students', async (req, res) => {
  try {
    const query = \`
      SELECT s.*, c.class_name, c.section 
      FROM students s 
      LEFT JOIN classes c ON s.class_id = c.id
      ORDER BY s.id DESC
    \`;
    const [rows] = await db.query(query);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST add new student
router.post('/students', async (req, res) => {
  const { roll_number, first_name, last_name, gender, class_id, guardian_contact, email } = req.body;
  try {
    const query = \`
      INSERT INTO students (roll_number, first_name, last_name, gender, class_id, guardian_contact, email)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    \`;
    const [result] = await db.query(query, [roll_number, first_name, last_name, gender, class_id, guardian_contact, email]);
    res.status(201).json({ success: true, studentId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;`;
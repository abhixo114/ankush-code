// Authentication Middleware
const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.user = user;
    next();
};

      // server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

//data base (replace with actual database usage)
let users = [];
let students = [];
let interviews = [];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Middleware
const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.user = user;
    next();
};

// Routes

// Sign Up
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, password });
    res.json({ message: 'Sign up successful', username });
});

// Sign In
app.post('/signin', authenticateUser, (req, res) => {
    res.json({ message: 'Sign in successful', username: req.user.username });
});

// List of Students
app.get('/students', (req, res) => {
    // Return list of students (replace with actual database query)
    res.json(students);
});

// Add New Student
app.post('/students', (req, res) => {
    // Add new student to the list (replace with database insertion)
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student added successfully', student: newStudent });
});

// List of Interviews
app.get('/interviews', (req, res) => {
    // Return list of interviews (replace with actual database query)
    res.json(interviews);
});

// Form to Create an Interview
app.post('/interviews', (req, res) => {
    // Create new interview (replace with database insertion)
    const newInterview = req.body;
    interviews.push(newInterview);
    res.json({ message: 'Interview scheduled successfully', interview: newInterview });
});

// Allocate a Student to an Interview
app.post('/allocate', (req, res) => {
    // Allocate student to interview (replace with database update)
    const { studentId, interviewId } = req.body;
    // response
    res.json({ message: 'Student allocated to interview successfully', studentId, interviewId });
});

// Select an Interview to View the List of Students and Mark Result Status
app.get('/interviews/:id', (req, res) => {
    // Retrieve interview details (replace with actual database query)
    const interviewId = req.params.id;
    const interview = interviews.find(interview => interview.id === interviewId);
    if (!interview) {
        res.status(404).json({ message: 'Interview not found' });
    } else {
        //response
        const studentsInInterview = students.filter(student => student.interviewId === interviewId);
        res.json({ interview, studentsInInterview });
    }
});

// Mark Result Status
app.post('/results', (req, res) => {
    // Update result status (replace with database update)
    const { studentId, result } = req.body;
    //  response
    res.json({ message: 'Result status updated successfully', studentId, result });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

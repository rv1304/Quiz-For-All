const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API to get list of subjects
app.get('/api/subjects', async (req, res) => {
    try {
        const subjectsDir = path.join(__dirname, 'public', 'subjects');
        const subjects = await fs.readdir(subjectsDir);
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load subjects' });
    }
});

// API to get list of quizzes for a subject
app.get('/api/quizzes/:subject', async (req, res) => {
    try {
        const subjectDir = path.join(__dirname, 'public', 'subjects', req.params.subject);
        const quizzes = await fs.readdir(subjectDir);
        res.json(quizzes.filter(file => file.endsWith('.html')));
    } catch (err) {
        res.status(500).json({ error: 'Failed to load quizzes' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
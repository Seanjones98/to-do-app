const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Temporary in-memory data store
let tasks = [];

// Home route - Show tasks
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add a task
app.post('/add', (req, res) => {
    const task = req.body.task;
    if (task.trim()) tasks.push(task);
    res.redirect('/');
});

// Delete a task
app.post('/delete', (req, res) => {
    const taskIndex = req.body.index;
    tasks.splice(taskIndex, 1);
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

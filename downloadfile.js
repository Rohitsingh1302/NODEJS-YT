const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

// Home page with form
app.get('/', (req, res) => {
    res.send(`
        <h2>Student File Download</h2>
        <form method="POST" action="/submit">
            <input type="text" name="regno" placeholder="Registration No" required /><br><br>
            <input type="text" name="name" placeholder="Name" required /><br><br>
            <input type="text" name="grade" placeholder="Grade" required /><br><br>
            <input type="text" name="filename" placeholder="File name to download" required /><br><br>
            <button type="submit">Submit & Download</button>
        </form>
    `);
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { regno, name, grade, filename } = req.body;

    const filePath = path.join(__dirname, filename);

    // Create text file with student info
    const content = `
Reg No: ${regno}
Name: ${name}
Grade: ${grade}
    `;

    fs.writeFileSync(filePath, content.trim());

    // Send file for download
    res.download(filePath);
});

app.listen(5000, () => {
    console.log('Server running');
});

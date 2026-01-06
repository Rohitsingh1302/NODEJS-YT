const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/calculator', (req, res) => {
    res.send(`
        <form method="GET" action="/calc/:num1/:num2">
            <button type="submit">Calculate</button>
        </form>
    `);
});

app.get('/calc/:num1/:num2', (req, res) => {
    const num1 = Number(req.params.num1);
    const num2 = Number(req.params.num2);

    const add = num1 + num2;
    const subtract = num1 - num2;
    const multiply = num1 * num2;
    const divide = num2 !== 0 ? (num1 / num2) : 'Infinity';

    res.json({
        addition: add,
        subtraction: subtract,
        multiplication: multiply,
        division: divide
    }); 
    
});
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});


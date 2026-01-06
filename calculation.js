const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const middleware = (req, res, next) => {
    const num = Number(req.body.number);

    req.result = {
        original: num,
        increment: num + 1,
        decrement: num - 1,
        square: num * num
    };
    next();
}

app.get('/form',async(req,res)=>{
    res.send(`
         <form method="POST" action="/calculate">
            <input type="number" name="number" placeholder="Enter number" required />
            <button type="submit">calculate</button>
        </form>
        `)
})

app.post('/calculate', middleware, (req, res) => {
    const emp = req.result;

    let html = `
        <h3>
            Original Number: ${emp.original}<br>
            Increment: ${emp.increment}<br>
            Decrement: ${emp.decrement}<br>
            Square: ${emp.square}
        </h3>
        <hr>
        <a href="/form">Go Back</a>
    `;

    res.send(html);
});



app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
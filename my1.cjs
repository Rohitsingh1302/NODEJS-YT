const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Schema, model } = mongoose;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bsf = new Schema({     // blueprint
    name: String,
    email: String,
    salary: Number,
    dept: String
});

mongoose.connect("mongodb://localhost:27017/bsf") // db connection
  .then(() => console.log("Connected to bsf database"))
  .catch(console.error);
  
const soldier = model('soldier', bsf);

app.get("/", (req, res) => {  // START OF CREATE
    res.send(`
    <form action="/add" method="post">
      <input type="text" name="name" placeholder="name">
      <input type="email" name="email" placeholder="email">
      <input type="number" name="salary" placeholder="salary">
      <input type="text" name="dept" placeholder="dept">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/add", async (req, res) => { // END OF CREATE
    console.log("BODY =", req.body);
    const { name, email, salary, dept } = req.body;
    const emp = new soldier({ name, email, salary, dept });
    await emp.save();
    res.send("soldier added");
});

app.listen(3000, () => {    //server start
    console.log("server started at `http://localhost:3000`");
});
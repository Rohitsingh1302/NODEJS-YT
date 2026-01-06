//how to connect with mongo db lets see
const mongoose = require('mongoose');
const {model,Schema} = mongoose;
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));//body parser it parses form data
app.use(express.json());//body parser to parse json data

/*
name. email, salary,dept csv
*/

const employeeSchema = new Schema({
    name:String,
    email:String,
    salary:Number,
    dept:String
});// blueprint

//db connection
mongoose.connect("mongodb://127.0.0.1:27017/ca")
  .then(() => console.log("Connected to ca database"))
  .catch(err => console.log(err));


const Employee = model('Employee',employeeSchema);//model means collection us collection ka name h "Employee" aur wo blueprint employee ka use kar rha h

//----------------START OF CREATE-----------------------
app.get('/add', (req, res) => {
    res.send(`
        <form action='/add' method='post'>
            <input type="text" name="name" placeholder="name">
            <input type="email" name="email" placeholder="email">
            <input type="number" name="salary" placeholder="salary">
            <input type="text" name="dept" placeholder="dept">
            <button type="submit">Submit</button>
        </form>
    `);
});//y dikhega

app.post('/add',async(req,res)=>{
    console.log("BODY =", req.body);
    const {name,email,salary,dept} = req.body;
    const employee = new Employee({name,email,salary,dept});
    await employee.save();
    res.send('employee added');
});

//-----------------END OF CREATE-------------------------

app.get('/find',async(req,res)=>{
    const rishav = await Employee.find({salary:{$gt:5000}});
    //find always return array of objects 
    const names = rishav.map(e => e.name);
    res.end(names.toString());
});


app.get('/all', async (req, res) => {
    const all = await Employee.find();
    const data = all.map(e => e.name + " " + e.email + " " + e.salary + " " + e.dept+"<br>");
    res.send(data.toString()); // browser me new line ke liye <br>
});

//-----------DEL-------------------
app.delete('/del',async(req,res)=>{
    const del  = await Employee.deleteMany({salary:{$lt:5000}});
    res.send("deleted");
})
app.delete('/del/:sal',async(req,res)=>{
    const {sal} = req.params;//http://localhost:3000/del/5000 it reads paramenter okay
    const del  = await Employee.deleteOne({salary:sal});
    res.send(`deleted with ${sal}`);
})
//delete w9th name 

//----------UPDATE---------------
//app.get se name aur salary for update and submit button same as you done in create
app.put('/update/:name',async(req, res)=>{
    const {name} = req.params;
    const {salary} = req.body;
    const update = await Employee.updateOne({name:name},{$set:{salary:salary}});
    res.send("updated");
})

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
  });
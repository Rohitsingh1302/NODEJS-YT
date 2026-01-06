//how to connect with mongo db lets see
const fs = require('fs');
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

const data = fs.readFileSync('imp2.json','utf-8');
const obj = JSON.parse(data);

const {name,email,salary,dept} = obj;
const employee = new Employee({name,email,salary,dept});
employee.save().then(() => console.log("data saved"));

app.post('/add',async(req,res)=>{
     console.log("BODY =", req.body);
    const {name,email,salary,dept} = req.body;
    const employee = new Employee({name,email,salary,dept});
    await employee.save();
    res.send('employee added');
});
app.get('/find',async(req,res)=>{
    const rishav = await Employee.find({salary:{$gt:5000}});
    //find always return array of objects 
    const names = rishav.map(e => e.name);
    res.end(names.toString());
})
app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
  });




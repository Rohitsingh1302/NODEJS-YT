//how to connect with mongo db lets see
const csv = require('csv-parser');
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


const obj = [];

fs.createReadStream('student.csv')
  .pipe(csv())
  .on('data', (data) => obj.push(data))
  .on('end', async () => {
    console.log("CSV Parsed:", obj);

    // Insert all rows into MongoDB
    for (let i = 0; i < obj.length; i++) {
        const { name, email, salary, dept } = obj[i];
        const employee = new Employee({ name, email, salary, dept });
        await employee.save();
    }

    console.log("All CSV data saved to MongoDB");
  });




app.post('/add',async(req,res)=>{
    res.end(`
        <Form action='/add' method='post'>
            <input type="text" name="name" placeholder="name">
            <input type="email" name="email" placeholder="email">
            <input type="number" name="salary" placeholder="salary">
            <input type="text" name="dept" placeholder="dept">
            <button type="submit">Submit</button>
        </Form>
        `)
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




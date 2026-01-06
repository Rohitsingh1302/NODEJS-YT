const express = require('express');
const mongoose = require('mongoose');
const { Schema ,model} = mongoose;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
    const connect = async () => {
        try{
        await mongoose.connect('mongodb+srv://user:kickBash@cluster0.pqwwxm3.mongodb.net/?appName=Cluster0');
        console.log('Connected to MongoDB');
        }catch(err){
            console.log('Error connecting to MongoDB', err);
        }

    };
connect();
const employeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true }
}, { timestamps: true });

const Employee = model('Employee', employeeSchema);


app.get("/add", (req, res) => {
    res.send(`
        <form method="POST" action="/add">
            <input type="text" name="name" placeholder="Enter name" required />
            <input type="email" name="email" placeholder="Enter email" required />
            <input type="text" name="department" placeholder="Enter department" required />
            <input type="number" name="salary" placeholder="Enter salary" required />
            <button type="submit">Add Employee</button>
        </form>
    `);
}); 
app.post('/add',async(req, res) => {
    const { name, email, department, salary } = req.body;
    const employee = new Employee({ name, email, department, salary });
    try {
        const savedEmployee = await employee.save();
       res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.get('/emp', (req, res) => {
    res.send(`
        <form method="POST" action="/cond">
            <input type="number" name="salary" placeholder="Enter salary to search" required />
            <button type="submit">Search Employees</button>
        </form>
    `);
});
app.post('/cond',async(req,res)=>{
    const {salary} = req.body;
    const employee = await Employee.find({salary:salary});
     let html = employee.map(emp => `
            <h3>
                Name: ${emp.name}<br>
                Email: ${emp.email}<br>
                Department: ${emp.department}<br>
                Salary: ${emp.salary}
            </h3>
            <hr>
        `).join('');
        res.send(html);
})

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});

        let html = employees.map(emp => `
            <h3>
                Name: ${emp.name}<br>
                Email: ${emp.email}<br>
                Department: ${emp.department}<br>
                Salary: ${emp.salary}
            </h3>
            <hr>
        `).join(',');

        res.send(html);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/update',async (req, res) => {
    const {name} = req.body;
    try{
    const update = await Employee.updateOne({name:name},{$set:{salary:1000000}});
        res.send("update succesfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

app.put('/update/:name',async (req, res) => {
    const {name} = req.params;
    try{
    const update = await Employee.updateOne({name:name},{$set:{salary:1000000}});
        res.send("update succesfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

app.get('/getAll/:sal',async(req,res)=>{
    const {sal} = req.params;
    
    try{
        const All=await Employee.find({salary:{$gt:sal}});
        let html = All.map(emp => `
            <h3>
                Name: ${emp.name}<br>
                Email: ${emp.email}<br>
                Department: ${emp.department}<br>
                Salary: ${emp.salary}
            </h3>
            <hr>
        `).join(',');
        res.send(html);
    }catch(err){
         res.status(400).json({ error: err.message });
    }
})

app.delete('/delete/:sal',async(req,res)=>{
    const {sal} = req.params;
    try{
   const del = await Employee.deleteOne({ salary: sal });
    res.send("deleted succesfully");
    }catch(err){
         res.status(400).json({ error: err.message });
    }
})

app.get('/', (req, res) => {    

    res.send('Server is up. Use /upload-employees to POST employee CSV data.');
});

app.listen(7000, () => {
    console.log('Server running on http://localhost:7000');
});
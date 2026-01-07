const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------- Schema ---------- */
const soldierSchema = new mongoose.Schema({
  name: String,
  email: String,
  salary: Number,
  dept: String
});

/* ---------- Database Connection ---------- */
mongoose.connect("mongodb://localhost:27017/bsf")
  .then(() => console.log("Connected to bsf database"))
  .catch(console.error);

/* ---------- Model ----------  what is model? Model is a class that we use to create and read documents from a collection.  */
const Soldier = mongoose.model("Soldier", soldierSchema);

/* ---------- CREATE ---------- */
// Form
app.get("/", (req, res) => {
  res.send(`
    <h2>Add Soldier</h2>
    <form action="/add" method="post">
      <input name="name" placeholder="Name" required><br><br>
      <input name="email" placeholder="Email" required><br><br>
      <input name="salary" placeholder="Salary" required><br><br>
      <input name="dept" placeholder="Department" required><br><br>
      <button type="submit">Add</button>
    </form>
    <br>
    <a href="/all">View All Soldiers</a>
  `);  
});

app.post("/add", async (req, res) => {
  const soldier = new Soldier(req.body);
  await soldier.save(); // save() method saves the document to the collection
  res.send("Soldier Added Successfully <br><a href='/'>Go Back</a>");
});

/* ---------- READ ---------- */
app.get("/all", async (req, res) => {
  const soldiers = await Soldier.find(); // find() method fetches all documents from the collection
  res.json(soldiers);
});

/* ---------- UPDATE ---------- */
app.get("/update/:id", async (req, res) => {
  await Soldier.findByIdAndUpdate(req.params.id, { // findByIdAndUpdate() method updates a document by its ID
    name: "VISHAL KUMAR"
  });
  res.send(`Soldier with ID ${req.params.id} updated to VISHAL KUMAR`);
});   // run karne ka tareeka:- pehle data bhrdo koi v, fr uski id copy krke url me localhost:3000/update/695d514dcb3fc70576a7cbc4 krdo and enter krdo


/* ---------- DELETE ---------- */
app.get("/delete/:id", async (req, res) => {
  await Soldier.findByIdAndDelete(req.params.id);
  res.send(`Soldier with ID ${req.params.id} deleted successfully`);
});   // run karne ka tareeka:- pehle data bhrdo koi v, fr uski id copy krke url me localhost:3000/delete/695d514dcb3fc70576a7cbc4 krdo and enter krdo

/* ---------- Server ---------- */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

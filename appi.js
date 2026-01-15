const express = require("express");
const app = express();

app.use(express.json()); // body parse

app.get("/users", (req, res) => {
  res.json({ message: "Users fetched" });
});

app.post("/users", (req, res) => {
  const user = req.body;
  res.json({
    message: "User added",
    user: user
  });
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});

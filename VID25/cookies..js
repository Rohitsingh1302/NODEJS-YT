const express = require("express")();
const cookieParser = require("cookie-parser");

// middleware
app.use(cookieParser());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Cookie Demo");
});

// SET COOKIE
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Rohit", {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true
  });
  res.send("Cookie has been set");
});

// READ COOKIE
app.get("/get-cookie", (req, res) => {
  const user = req.cookies.username;
  res.send("Cookie value is: " + user);
});

// DELETE COOKIE
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie deleted");
});

app.listen(8000, () => {
  console.log("Server running" );
});

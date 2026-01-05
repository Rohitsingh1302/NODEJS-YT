const app = require("express")();
const cookieParser = require("cookie-parser");

// middleware
app.use(cookieParser());

// Home route
app.get("/", (req, res) => {
  let count = req.cookies.visitCount;

  if (count) {
    count = parseInt(count) + 1;
  } else {
    count = 1;
  }

  // set/update cookie
  res.cookie("visitCount", count, {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true
  });

  res.send(`You have visited this page ${count} times`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

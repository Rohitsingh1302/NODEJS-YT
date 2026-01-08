const app = require("express")();
const cookieParser = require("cookie-parser");
// middleware
app.use(cookieParser());
// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Cookie Demo");
});
// SET COOKIE
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Rohit", {                //res.cookie  is used to set cookie
    maxAge: 24 * 60 * 60 * 1000,                  // 1 day
    httpOnly: true
  });
  res.send("Cookie has been set");
});
// READ COOKIE
app.get("/get-cookie", (req, res) => {                   
  const user = req.cookies.username;             //req.cookies is used to read cookie
  res.send("Cookie value is: " + user);
});
// DELETE COOKIE
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");                    //res.clearCookie is used to delete cookie
  res.send("Cookie deleted");
});

app.listen(8000, () => {
  console.log("Server running" );
});
//propertis of cookie
//1. name
//2. value
//3. expire time
//4. httpOnly
//5. secure
//6. domain
//7. path

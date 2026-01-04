// const exp = require("express");
// const app = exp();
//or
const app = require("express")();

app.get("/", (req, res) => {
    res.send("Hello from HOME page");
});
app.get("/about", (req, res) => {
    res.send("Hello" + req.query.name + "you are"  + req.query.age + "old.");// localhost:7000/about?name=rohit&age=21
});
app.get("/contact", (req, res) => {
    res.send("Hello from CONTACT page");
});
 
app.listen(7000, console.log("Server is listening on port 7000"));

//evcerything is built in here ..url ki jrurat v nahi query v nahi
// easy way to handle routing

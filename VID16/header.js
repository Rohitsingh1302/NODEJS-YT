const app=require("express")();

app.get("/",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    res.send("<h1>HELLO ROHIT FROM HOME PAGE</h1>");
});

app.get("/users",(req,res)=>{
    res.setHeader("Content-Type","application/json");
     res.json({message: "No users data available"});
});

app.listen(8000, () => {
    console.log("SERVER RUNNING");
}); 
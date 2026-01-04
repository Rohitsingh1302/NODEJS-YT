const exp=require("express");
const app=exp();

app.use(exp.urlencoded({extended: false}));

app.use((req,res,next)=>{
  console.log("hello from middleware");
  req.username="Rohit";
  next();
});

app.use((req,res,next)=>{
  console.log("hello from middleware 2"+req.username);
  next();
});
app.get("/",(req,res)=>{
    res.send("HELLO ROHIT FROM HOME PAGE");
});

app.get("/users",(req,res)=>{
     res.json({message: "No users data available"});
}); 

app.listen(8000, () => {
    console.log("SERVER RUNNING");
});
//client(chrome,postmann)-request krte hai
//server(nodejs,express)-response krte hai
//restapi is a bridge between client and server with the help of http methods(get{read},post{add},put{update},delete)
const exp=require("express");
const user=require("./MOCK_DATA.json")
const app=exp();

// Middleware to parse JSON bodies
app.use(exp.urlencoded({extended: false}));


//routes
app.get("/",(req,res)=>{
    res.send("HELLO ROHIT\n write /users TO GET USER DATA");
});

app.get("/users",(req,res)=>{
     res.json(user);
}); 

app.get("/users/:id",(req,res)=>{
    const uid=Number(req.params.id);
    const foundUser=user.find((obj)=>obj.id===uid);
    res.json(foundUser);
});

app.post("/users/post",(req,res)=>{
    console.log(body); // jo bhi data postman se bhejenge wo yaha print hoga
    user.push(req.body); // jo bhi data postman se bhejenge wo user array m add ho jayega
    res.json({message:"data added successfully",users:user}); // ab postman m jaake dekh skte hai, localhost/users/1001 
}); 
app.listen(8000,console.log("SERVER RUNNING")); //localhost:8000/users




 
//if sirf user ke name chaiye tou:-
// app.get("/users",(req,res)=>{
//     const names=user.map((obj)=>obj.first_name);
//      res.json(names);
// });
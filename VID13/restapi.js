//client(chrome,postmann)-request krte hai
//server(nodejs,express)-response krte hai
//restapi is a bridge between client and server with the help of http methods(get{read},post{add},put{update},delete)
const exp=require("express");
const user=require("./MOCK_DATA.json")
const app=exp();

app.get("/",(req,res)=>{
    res.send("HELLO ROHIT\n write /users TO GET USER DATA");
});

app.get("/users",(req,res)=>{
     res.json(user);
}); 

app.listen(8000,console.log("SERVER RUNNING"));





//if sirf user ke name chaiye tou:-
// app.get("/users",(req,res)=>{
//     const names=user.map((obj)=>obj.first_name);
//      res.json(names);
// });
//client(chrome,postmann)-request krte hai
//server(nodejs,express)-response krte hai
//restapi is a bridge between client and server with the help of http methods(get{read},post{add},put{update},delete)
const exp=require("express");
const user=require("./MOCK_DATA.json")
const app=exp();

app.get("/users",(req,res)=>{
    return res.json(user);
});

app.listen(8000,console.log("SERVER RUNNING"));

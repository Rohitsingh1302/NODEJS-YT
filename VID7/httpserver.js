//simple http server code,request handling code:
const http=require('http'); 
const myserver=http.createServer((req,res)=>{ 
    res.end("Hello from my first server!"); 
});
myserver.listen(8000,console.log("Server is listening on port 8000")); // chrome pr jaake localhost:8000 search kro to server ka response dekh skte h.




//request example code:-
const http2=require('http');
const myserver2=http2.createServer((req,res)=>{
    const url=req.url; // req.url se requested URL milta hai.
    if(url=='/'){
        res.end("This is the home page");
    }
    else if(url=='/about'){
        res.end("This is the about page");
    }
    else{
        res.end("404 Not Found");
    }
});
myserver2.listen(9000,console.log("Server is listening on port 9000"));  //9000 pr server listen kr rha h
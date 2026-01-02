//get,post.put,patch,delete methods;
//get method
// app.get('/about',(req,res)=>{
//     res.send("hello this is about page");
//post method
// app.post('/about',(req,res)=>{
//     res.send("hello this is about page");
//put method
// app.put('/about',(req,res)=>{
//     res.send("hello this is about page");
//patch method
// app.patch('/about',(req,res)=>{
//     res.send("hello this is about page");
//delete method
// app.delete('/about',(req,res)=>{
//     res.send("hello this is about page");
//all methods
app.all('/about',(req,res)=>{
    res.send("hello this is about page");
})
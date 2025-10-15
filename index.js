const express=require('express');
const app=express()

//A middleware that will redirect to the next route.
app.get('/user',(req,res,next)=>{
    console.log("Middleware calling");
    //next() calls the next route.
    next();
})
app.get('/user',(req,res)=>{
    //On calling of next() , this route handler is executed
    res.send("Second Route Handler");
})

app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
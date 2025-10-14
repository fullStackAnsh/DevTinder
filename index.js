const express=require('express');
const app=express()

app.use('/',(req,res)=>{
    res.send("Hello");
});

app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
const express=require('express');
const app=express()

app.post('/user',(req,res)=>{
   //This sends the URL query Param .
   //ex:localhost:3000/user?username=Ansh
    res.send(req.query);
});

app.post('/test/:testId',(req,res)=>{
   //This sends the URL Param.
   //ex:localhost:3000/test/Ansh
    res.send(req.params);
});

app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
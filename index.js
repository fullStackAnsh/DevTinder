import express from 'express'
import { adminAuth } from './middleware/auth.js';
const app=express()

//Dummy Middleware adminAuth is called 
app.get('/admin/getAllData',adminAuth,(req,res)=>{
    try{
    //Throwing error will redirect to catch block      
    throw new Error('xyz')    
    res.send("Fetching all data")
   }
   catch(err){
    //This block will handle the error
    res.send("Somethng wrong happened!");
   }
})

app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
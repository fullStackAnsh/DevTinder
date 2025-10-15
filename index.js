import express from 'express'
import { adminAuth } from './middleware/auth.js';
const app=express()

//Dummy Middleware adminAuth is called 
app.get('/admin/getAllData',adminAuth,(req,res)=>{
    res.send("Fetching all data")
})

app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
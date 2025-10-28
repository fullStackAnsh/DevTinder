import express from 'express'
import { connectDB } from './config/database.js';
import { adminAuth } from './middleware/auth.js';
const app=express()

//DB is connected first
connectDB("mongodb+srv://ansh:13july2004@devtinder.4gqyvlq.mongodb.net/?appName=DevTinder/DevTinder")
.then(()=>{
    console.log("DB connected")
    //Server is started after DB Connection
    app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
})
.catch((err)=>{console.log(err)})



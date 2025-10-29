import express from 'express'
import { connectDB } from './config/database.js';
import { adminAuth } from './middleware/auth.js';
import { User } from './model/user.js';
const app=express()

app.post("/user",async (req,res)=>{
   await User.create({
        name:"ansh",
        email:"ansh@gmail.com",
        password:"13july2004",
        age:20,
        gender:"male"
    });
   
    res.send("USer saved successfully");
})


//DB is connected first
connectDB("mongodb+srv://ansh:13july2004@devtinder.4gqyvlq.mongodb.net/DevTinder?appName=DevTinder")
.then(()=>{
    console.log("DB connected")
    //Server is started after DB Connection
    app.listen(3000,()=>{
    console.log("This server is running at port 3000");
})
})
.catch((err)=>{console.log(err)})



import express from 'express'
import { connectDB } from './config/database.js';
import { adminAuth } from './middleware/auth.js';
import { User } from './model/user.js';

const app=express()
//middleware to parse json
app.use(express.json())

app.post("/user",async (req,res)=>{

   const user = new User(req.body);

   try{
    await user.save();
    res.send("USer saved successfully");}
    catch(err)
    {res.send(err)}
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



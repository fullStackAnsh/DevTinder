import express from 'express'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail.js';
import { connectDB } from './config/database.js';
import { userAuth } from './middleware/auth.js';
import { User } from './model/user.js';
import { validateSignup } from './utils/validateSignup.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

const app=express()
//middleware to parse json
app.use(express.json())
app.use(cookieParser());

app.post("/signup",async (req,res) =>{
  try{
  //Validating data using helper function
  validateSignup(req.body);
  
  const {firstName,lastName,emailId,password} = req.body;

  //Encrypt password using bcrypt 
  const hashedPassword = await bcrypt.hash(password,10);
  
  //Save the user
   const user = new User({
    firstName:firstName,
    lastName:lastName,
    emailId:emailId,
    password:hashedPassword
   });

  
    await user.save();
    res.send("USer saved successfully");}
    catch(err)
    {res.send(err.message)}
})

//Login API
app.post("/login",async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(!email || !password){throw new Error("Please enter all credentials")}
    
    //Checking if user exists
    const user =await User.findOne({emailId:email});
    if(!user){
      throw new Error("User doesn't exist")
    }
    //Comparing user password with db password
    const match=await bcrypt.compare(password,user.password);

    if(match){
      //Assigning jwt token
      const token=await jwt.sign({userId:user._id.toString()},"jwtSecret")
      
      //Storing it in cookie
      res.cookie("token",token);
      res.send("Login Successful");
    }
    else{
      res.send("Invalid credentials")
    }
  }catch(err){
    res.send(err.message);
  }
})



app.get("/feed",userAuth,async (req,res)=>{
  try{
   const users=await User.find({});
   res.send(users);
  }
  catch(err){
   res.send(err);
  }
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



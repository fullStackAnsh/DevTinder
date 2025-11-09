import express from 'express'
import { validateSignup } from '../utils/validateSignup.js';
import { User } from '../model/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router=express.Router()


router.post("/signup",async (req,res) =>{
  try{
  //Validating data using helper function
  validateSignup(req.body);
  
  const {firstName,lastName,emailId,password} = req.body;

  //Encrypt password using bcrypt 
  const hashedPassword = await User.hashPassword(password);
  
  
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
router.post("/login",async (req,res)=>{
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
      const token=await jwt.sign({userId:user._id.toString()},"jwtSecret",
      { expiresIn: '30d' })
      
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

router.post('/logout',(req,res)=>{
    try{
      //clear cookie token from browser
      res.clearCookie('token')
      res.send("Logout Successful");
    }
    catch(err){
      res.send(err)
    }
})

export default router
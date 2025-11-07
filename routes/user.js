import express from 'express'
import { User } from '../model/user.js';
import { userAuth } from '../middleware/auth.js';
const router = express.Router()

router.get("/feed",userAuth,async (req,res)=>{
  try{
   const users=await User.find({});
   res.send(users);
  }
  catch(err){
   res.send(err);
  }
})

export default router
import express from 'express'
import { userAuth } from '../middleware/auth.js';
import {User} from '../model/user.js'

const router = express.Router();

router.get('/getProfile',userAuth,(req,res)=>{
    try{
        const user=req.user;
        res.json(user);

    }
    catch(err){
        res.send(err)
    }
})

router.patch('/updateProfile',userAuth,async (req,res)=>{
    try{
        const userId=req.user._id;
        const updates=req.body;

        const allowedUpdates=['firstName','lastName','skills','gender','age','about']

        const validUpdate=Object.keys(updates).every((key)=>allowedUpdates.includes(key))

        if(!validUpdate){
            throw new Error("Cannot update value")
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{ $set: updates },
  { new: true, runValidators: true })

        res.json({user:updatedUser});

    }
    catch(err){
        res.send(err)
    }
})

export default router
import express from 'express'
import { userAuth } from '../middleware/auth.js';
import {User} from '../model/user.js'
import { ConnectionRequest } from '../model/connectionRequest.js';
const router = express.Router();

router.post('/:status/:toUserId',userAuth,async(req,res)=>{
    //Extract userId and status from params.
    const status = req.params.status
    const toUserId=req.params.toUserId
    const fromUserId=req.user._id
    try{
    //Validate if receiver id exists.
    const receiver =await User.findById(toUserId)
    if(!receiver){
        throw new Error("Receiver doesnt exist")
    }

    //Validate if connection request doesnt exist already.
    const ExistingConnectionRequest =await ConnectionRequest.find({
        $or:[{fromUserId:fromUserId,toUserId:toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
    })

    if(ExistingConnectionRequest.length > 0){
      throw new Error("Connection Request Already Exist")
    }
    
    //Validate that sender id is not equal to receiver id.
    if(toUserId==fromUserId) throw new Error("You cannot send request to yourself")

    //Creating connection request and saving in DB.
    const request = await ConnectionRequest.create({fromUserId:fromUserId,toUserId:toUserId,status:status})
    res.send(request)

    }
    catch(err){
        res.send(err.message)
    }
})


router.post('/review/:status/:senderId',userAuth,async (req,res)=>{
   //Initialising logged in user id and sender id
   const loggedInUser = req.user;
   const {status,senderId} = req.params;
   try{
   //Validating if request exist with status as interested
   const allowedStatus=["accepted","rejected"]

   if(!allowedStatus.includes(status)){
    throw new Error("Status not allowed")
   }

   const ExistingConnectionRequest = await ConnectionRequest.findOne({
    fromUserId:senderId,
    toUserId:loggedInUser._id,
    status:'interested'
   })
   
   if(ExistingConnectionRequest==null){
    throw new Error("Connection request doesn't exists.")

   }

   //Changing the status to accepted
   ExistingConnectionRequest.status=status;
   const data = await ExistingConnectionRequest.save()
   res.status(200).json({data})

   }
   catch(err){
    res.status(400).json({error:err.message})
   }
})

export default router;
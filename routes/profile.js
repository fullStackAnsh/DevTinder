import express from 'express'
import { userAuth } from '../middleware/auth.js';

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

export default router
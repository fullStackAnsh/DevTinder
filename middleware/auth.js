import jwt from 'jsonwebtoken'
import { User } from '../model/user.js';

export const userAuth = async (req,res,next)=>{
    try{
        //Accessing it from cookies
        const {token}=req.cookies;
       // console.log(token)
        if(!token){
            throw new Error("Token not found");
        }
        //Verifying the token
        const decodedToken=await jwt.verify(token,"jwtSecret");
        
        // ✅ Find the user in DB to make sure they still exist
        const user = await User.findById(decodedToken.userId);
        if (!user) throw new Error("User not found");
        // ✅ Attach to req for later use
        req.user = user;
        
        next();

    }catch(err){
        res.send(err)
    }
}
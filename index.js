import express from 'express'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail.js';
import { connectDB } from './config/database.js';
import { userAuth } from './middleware/auth.js';
import { User } from './model/user.js';
import { validateSignup } from './utils/validateSignup.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import profileRouter from './routes/profile.js'
import ConnectionRequestRouter from './routes/connectionRequest.js'
const app=express()
//middleware to parse json
app.use(express.json())
app.use(cookieParser());


app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/profile',profileRouter)
app.use('/connection/request',ConnectionRequestRouter)  






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



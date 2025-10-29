import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
   name:{type:String},
   email:{type:String},
   password:{type:String},
   age:{type:Number},
   gender:{type:String}
});

export const User=mongoose.model("User",userSchema);

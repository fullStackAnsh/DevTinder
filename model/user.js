import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt'

const userSchema = new Schema({
   firstName:{
      type:String,
      required:true
   },
   lastName:{
      type:String,
      required:true
   },
   emailId:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      //custom email regex validation
      match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
            'Please enter a valid email address.' 
        ]
   },
   password:{
      type:String,
      required:true
   },
   age:{
      type:Number,
      min:18
   },
   gender:{
      type:String,
      enum:['male','female','other'],
   },
   skills:{
     type:[String],
     //custom validation function to check length of array
     validate:{
      validator: function (v) {
        return v.length <= 10;
      },
      message: 'A user can have at most 10 skills.'
     }
   },
   about:{
      type:String,
      maxLength:100

   }
});

userSchema.statics.hashPassword = async function(userPassword){
   const hashedPassword = await bcrypt.hash(userPassword,10);
   return hashedPassword
}


export const User=mongoose.model("User",userSchema);

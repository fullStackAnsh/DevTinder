import mongoose from 'mongoose';
const { Schema } = mongoose;

const ConnectionRequestSchema = new Schema({
  fromUserId:{
    type:String,
    required:true
  },
  toUserId:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum: { 
        values: ['interested', 'ignored','accepted','rejected'],
         message: '{VALUE} is not supported' 
    },
    required:true
  }
});

export const ConnectionRequest=mongoose.model("ConnectionRequest",ConnectionRequestSchema);
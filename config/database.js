import mongoose from "mongoose";
export const connectDB = async (URI) => {
   await mongoose.connect(URI);
}
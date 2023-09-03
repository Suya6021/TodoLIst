import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const username=process.env.DB_USER;
const password=process.env.DB_PASSWORD;

const Connection=async()=>{
    const  MONGODB_URL=await `mongodb+srv://${username}:${password}@cluster0.nsmjpgj.mongodb.net/?retryWrites=true&w=majority`;
   try{
    mongoose.connect(MONGODB_URL,{})
    mongoose.connection.on('connected',()=>{
        console.log("Database connected Successfully")
    })
   }catch(e){
    console.log(e)
   }
}
export default Connection;
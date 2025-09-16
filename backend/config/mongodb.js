import mongoose from "mongoose";

const conectDB = async ()=>{
  mongoose.connection.on('connected' , ()=> console.log("database connected"))
  await mongoose.connect(`${process.env.MONGODB_URI}DoctorsGuide`)
}

export default conectDB
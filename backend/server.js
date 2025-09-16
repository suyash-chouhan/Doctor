import express, { json } from "express";
import cors from 'cors'
import 'dotenv/config'
import conectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express()
const port = process.env.PORT || 4000
conectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())

// api end point
app.use('/api/admin' , adminRouter)
// localhost:4000/api/admin
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter)

app.get('/' , (req,res)=>{
  res.send('API working fine')
})

app.listen(port , ()=>{
  console.log('server started' , port)
})
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Check all required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary (if exists)
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    // Parse address safely
    let parsedAddress;
    try {
      parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
    } catch (err) {
      return res.json({ success: false, message: "Invalid address format" });
    }

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      image: imageUrl,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for the admin login
const loginAdmin = async(req,res)=>{
  try {

    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       
        const token = jwt.sign(email+password , process.env.JWT_SECRET)
        res.json({success:true , token})

    }else{
      res.json({success:false , message:"Invalid credentials"} )
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// API to get all doctors list
const allDoctors = async (req,res)=>{
  try {

    const doctors = await doctorModel.find({}).select('-password')
    res.json({success: true , doctors})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}
export { addDoctor  , loginAdmin , allDoctors};

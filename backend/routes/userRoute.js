import express from 'express'
import { registerUser , loginUser, getProfile , updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUsers.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)

userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
userRouter.get('/get-profile', authUser, getProfile)

export default userRouter
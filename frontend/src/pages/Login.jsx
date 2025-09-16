import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import axios  from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl , token , setToken} = useContext(AppContext)
  const[state , setState] = useState('Sign up')

  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('')
  const[name , setName] = useState('')

  const navigate = useNavigate()

const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (state === 'Sign up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Account created successfully!");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in successfully!");
      } else {
        toast.error(data.message || "Login failed");
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

useEffect(()=>{
    if(token){
      navigate('/')
    }
},[token])


  return (
    <form onSubmit={onSubmitHandler} className="min-h-[18vh] flex items-center justify-center p-6 mt-20" action="">

      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-90 border border-zinc-300 rounded-xl text-zinc-600 shadow-primary  shadow-md'>
        <p className='text-2xl font-semibold text-primary'>{state === 'Sign up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign up' ? "Sign up" : "Log in"} to book appointment</p>

        {
          state === 'Sign up' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border  border-primary rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required />
        </div>
        }

        

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-primary rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-primary rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign up' ? "Create Account" : "Login"}</button>

        {
          state === 'Sign up' 
          ? <p>Already Have an Account  <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login</span></p>
          : <p>Create a new Account <span onClick={()=>setState('Sign up')} className='text-primary underline cursor-pointer'>Sign Up</span></p>
        }
      </div>

    </form>
  )
}

export default Login

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

  const {aToken , setAToken} = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = ()=>{
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="" />
        <p className="border px-3 py-1 rounded-full border-gray-300 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className="border px-3 py-1 rounded-full border-red-500 bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition">Logout</button>
    </div>
  )
}

export default Navbar

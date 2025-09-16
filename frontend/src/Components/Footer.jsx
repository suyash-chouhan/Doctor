import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  
  const navigate = useNavigate();

  return (
    <div className='md:m-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ---------left-section------- */}
        <div>
            <img className='mb-5 w-40' src={assets.logo2} alt="" />
            <p className='ml-5  w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime rerum sapiente doloremque quia quasi sint omnis dolore, repellendus tenetur exercitationem, pariatur, sunt quisquam.</p>
        </div>
        
        {/* ---------middle-section------- */}
        <div>
             <p className='text-xl font-medium mb-5'>COMPANY</p>

             <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
              <li onClick={()=>{navigate('/'); scrollTo(0,0)}}>Home</li>
              <li onClick={()=>{navigate('/about'); scrollTo(0,0)}}>About us</li>
              <li onClick={()=>{navigate('/contact'); scrollTo(0,0)}}>Contact us</li>
              <li>Privacy policy</li>
             </ul>
        </div>
        
        {/* ---------right-section------- */}
        <div>
               <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

               <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 87545-98546</li>
                <li>Doctorsguide@gmail.com</li>
               </ul>
        </div>

      </div>

      {/* --------------copy right text-------------- */}
        <div>
          <hr />
          <p className='py-5 text-xl text-center  text-primary'>Copyright 2024@ Doctor's Guide - All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer

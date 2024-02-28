import React from 'react'
import { Menu } from '../assets/Menu'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between mt-3 px-3'>
        <p className="font-limelight font-normal text-3xl text-[#D9D9D9] cursor-pointer">Notd</p>
        <div className='flex flex-row items-center space-x-2'>
            <button className='bg-[#11009E] h-11 w-24 rounded-md font-roboto text-white text-xs font-normal hover:bg-opacity-50'>Log In</button>
            <button className='h-11 w-24 border-2 border-white rounded-md font-roboto text-white text-xs font-normal hover:bg-[#11009E] hover:bg-opacity-50'>Sign Up</button>
            <Menu className=' text-white hover:bg-[#11009E] hover:rounded-full h-10 w-10 p-2 cursor-pointer'/>
        </div>
    </div>
  )
}

export default Navbar

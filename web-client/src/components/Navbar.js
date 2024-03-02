import React from 'react'

const Navbar = ({handleMenu}) => {
  return (
    <div className='flex flex-row justify-between mt-3 px-3'>
        <p className="font-limelight font-normal text-3xl text-[#D9D9D9] cursor-pointer">Notd</p>
        <div className='flex flex-row items-center space-x-2'>
            <button className='transition ease-in-out bg-[#11009E] h-11 w-24 rounded-md font-roboto text-white text-xs font-normal hover:opacity-50'>Log In</button>
            <button className='transition ease-in-out h-11 w-24 border-2 border-white rounded-md font-roboto text-white text-xs font-normal hover:bg-[#11009E] hover:opacity-50'>Sign Up</button>
            <img src='/icons/menu-icon.png' className=' text-white hover:bg-[#11009E] rounded-full h-10 w-10 p-2 cursor-pointer transition ease-in-out' onClick={handleMenu}/>
        </div>
    </div>
  )
}

export default Navbar

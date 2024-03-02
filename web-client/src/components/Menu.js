import React from "react";

const Menu = ({ handleMenu , menu}) => {
  return (
    <div className={`bg-[#11009E] py-9 transition duration-300 -mt-96 ${menu ? 'translate-y-0':'translate-y-full'}`}>
      <div className="flex flex-row justify-between mb-3 px-3">
        <p className="font-limelight font-normal text-3xl text-[#D9D9D9] cursor-pointer">
          Notd
        </p>
        <img
          src="icons/close-icon.png"
          className=" transition ease-in-out hover:bg-[#4942E4] rounded-full h-10 w-10 p-2 cursor-pointer"
          onClick={handleMenu}
        />
      </div>
      <ul className="flex flex-col font-roboto text-lg text-white text-start">
        <li className="hover: hover:bg-[#4942E4] px-4 py-3 transition ease-in-out font-extralight">Home</li>
        <li className="hover: hover:bg-[#4942E4] px-4 py-3 transition ease-in-out font-extralight">About</li>
        <li className="hover: hover:bg-[#4942E4] px-4 py-3 transition ease-in-out font-extralight">Contact Us</li>
        <li className="hover: hover:bg-[#4942E4] px-4 py-3 transition ease-in-out font-extralight">Help</li>
      </ul>
      <div className="flex flex-row justify-center space-x-4">
      <button className='transition ease-in-out bg-[#4942E4] h-11 w-1/3 rounded-3xl font-roboto text-white text-xs font-normal hover:bg-opacity-50'>Log In</button>
      <button className='transition ease-in-out bg-[#11009E] h-11 w-1/3 rounded-3xl font-roboto border-2 text-white text-xs font-normal hover:opacity-50'>Sign Up</button>
      </div>
    </div>
  );
};

export default Menu;

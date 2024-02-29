import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center py-4 px-4 justify-center space-y-3">
      <p className="font-limelight font-normal text-2xl text-[#D9D9D9] cursor-pointer ml-5">
        Notd
      </p>
      <ul className="flex flex-row font-roboto text-white font-light text-sm justify-stretch space-x-5">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Help</li>
        <li className="cursor-pointer">Contact Us</li>
      </ul>

    </div>
  );
};

export default Footer;

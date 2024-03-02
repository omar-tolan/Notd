import React, { useState } from "react";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import Menu from "./Menu";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div>
      <div className=""><Menu
        handleMenu={() => {
          toggleMenu();
        }}
        menu={menu}
      /></div>
      
      <div className={`pt-4 z-10 ${menu ? "" : " transition ease-in-out duration-300"}`}>
        <Navbar
          handleMenu={() => {
            toggleMenu();
          }}
        />
        <div className="flex flex-col items-center mx-4 mt-6">
          <div className="font-roboto font-bold text-2xl text-white text-left">
            Get Organized.
            <span className="text-[#11009E]">
              {" "}
              Notd Is Here To Help Organize Your Tasks
            </span>
          </div>
          <div className="font-roboto font-normal text-white text-left mt-1">
            Be the first to try our new task manager app built specially for
            you.
          </div>
          <button className="bg-[#11009E] rounded-3xl w-2/3 py-2 mb-5 text-white font-roboto font-medium text-md mt-4">
            Get Started
          </button>
          <img src="images/heropic.png" className="h-80 p-5" />
        </div>
        <div className="bg-[#FAE7F3] px-4 py-5">
          <p className="font-roboto text-black text-xl font-extrabold">
            Try Our New Dashboard
          </p>
          <p className="font-roboto text-black font-md font-light">
            Notd’s dashboard helps you manage all your tasks from one place.
          </p>
        </div>
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

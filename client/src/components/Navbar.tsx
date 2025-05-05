import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const handelProfile = () => {
        console.log("Profile clicked");
        navigate("/profile");
    };

    return (
      <nav className="Navbar flex justify-between items-center p-1 bg-white ">
        <div className="left flex items-center space-x-4">
          <img onClick={handelProfile} className="w-7 h-7 p-0 rounded-full ring-2  ring-gray-300 dark:ring-gray-500" src="https://i.pravatar.cc/40?img=1" title='go to profile' alt="Bordered avatar"/>
          <a href="/" title='Home' className="text-2xl text-black">Blogify</a>
        </div>
  
        <div className="right flex gap-3">
          <a
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-black transition"
          >
            Login
          </a>
          <a
            href="/reg"
            className="px-4 py-2 text-sm font-medium text-black border border-black rounded hover:bg-blue-50 transition"
          >
            Register
          </a>
        </div>
      </nav>
    );
  };
  
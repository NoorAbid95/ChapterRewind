import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky z-20 flex justify-center  mt-8 ">
      <ul className="flex items-center justify-between gap-10 w-1/2 px-8 py-4  rounded-full">
        <li className="font-caprasimo font-extrabold text-gray-50 text-lg text-shadow-xs text-shadow-black">
          <a href="/">ChapterRewind</a>
        </li>

        <ul className="flex space-x-5 text-white text-shadow-2xs">
          <li>Our Story</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;

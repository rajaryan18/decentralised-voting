import { useState } from "react";

import { close, logo, menu } from "../public/assets";
import { navLinks } from "./constants";
import Head from 'next/head'
import Image from 'next/image'

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  // function togglee(word) {
  //   const arr = ["login", "dashboard", "election", "profile"]
  //   arr.map((res) => {
  //     console.log(res == word)
  //     if (res == word) {
  //       document.getElementById(`${res}`).className = `text-blue-500 hover:text-blue-400 font-poppins font-normal cursor-pointer text-[16px] duration-200 `
  //     }
  //     else {
  //       document.getElementById(`${res}`).className = `text-white hover:text-blue-400 font-poppins font-normal cursor-pointer text-[16px] duration-200 `
  //     }
  //   })
  // }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="w-[124px] h-[32px] text-3xl text-white" >De<span className="text-[#60e0e6]">ction</span></div>

      <ul className="list-none sm:flex text-5sxl hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            id={nav.id}
            key={nav.id}
            className={`text-white hover:text-blue-400 font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          // onClick={(event) => togglee(`${nav.title}`)}
          >
            <a href={`/${nav.site}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <Image
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${!toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-white/50"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";

import { close, logo, menu } from "../public/assets";
import { navLinks, navLinks2 } from "./constants";
import Head from 'next/head'
import Image from 'next/image'
import meta from "../public/metamask.png"
import { useStateContext } from "../context";
import { useRouter } from "next/router";
import Link from 'next/link';
import dynamic from "next/dynamic";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { user, setUser, connectWallet, address, createCampaign, addUser } = useStateContext();
  const router = useRouter();


  const logout = () => {

    setUser(false);
    console.log("hiiii")

    router.push('/');

  }

  return (
    <nav className="w-full flex py-6 z-100 justify-between items-center navbar">
      <a href="/" className="w-[124px] h-[32px] text-3xl text-white -mt-3" >De<span className="text-[#60e0e6]">ction</span></a>

      <ul className="list-none sm:flex text-5sxl hidden justify-end items-center flex-1">
        {user ? navLinks.map((nav, index) => (
          <li
            id={nav.id}
            key={nav.id}
            className={`text-white hover:text-blue-400 font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={nav.id === "logout" ? () => { logout() } : null}
          >
            {nav.id === "logout" ? (<div>{nav.title}</div>) : (<Link href={`${nav.site}`}>{nav.title}</Link>)}
          </li>
        ))
          :
          navLinks2.map((nav, index) => (
            <li
              id={nav.id}
              key={nav.id}
              className={`text-white hover:text-blue-400 font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            // onClick={(event) => togglee(`${nav.title}`)}
            >
              <Link href={`/${nav.site}`}>{nav.title}</Link>
            </li>
          ))}
        <li className="items-center flex justify-center">
          <div onClick={address ? null : () => { connectWallet() }} className={`${user ? "ml-10" : "ml-0"}  w-32 h-8 items-center  bg-gradient-to-r flex text-[16px] from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800  justify-center text-white rounded-xl mx-auto  text-center py-1`}>
            {address ? "Connected" : "Connect"}

          </div>
        </li>
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
            {user ? navLinks.map((nav, index) => (

              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-blue-400 text-white ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={nav.id === "logout" ? () => { logout() } : null}
              >
                {nav.id === "logout" ? (<div>{nav.title}</div>) : (<Link href={`${nav.site}`}>{nav.title}</Link>)}
              </li>


            )) :
              navLinks2.map((nav, index) => (

                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-blue-400 text-white ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}

                >
                  <Link href={`/${nav.site}`}>{nav.title}</Link>
                </li>


              ))
            }
            <li className="items-center flex justify-center bg-o">
              <div onClick={address ? null : () => { connectWallet() }} className="font-poppins font-medium mb-4 w-32 h-8 items-start  bg-gradient-to-r flex text-[16px] from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800  justify-center text-white rounded-xl mx-auto  text-center py-1 mt-4 -ml-2 ">
                {address ? "Connected" : "Connect"}

              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


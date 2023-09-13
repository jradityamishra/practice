import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import Logo from "../assets/namelogo-tr.png";
import { Link } from "react-scroll";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleClick = () => setNav(!nav);

  return (
    <div className=" w-full h-[80px] mb-6 flex justify-between items-center pl-4 pr-12 text-white bg-gray-900">
      <Link to="/" smooth={true} duration={500}>
        <div className="flex flex-row">
          <div>
            <img
              src="https://play-lh.googleusercontent.com/3APi4HdWb0_rhnhAEoyJEYfSemXW9cNbA2VdOCSN7L6wgdjC_oTxLphER647R9PnSCkV"
              alt="Logo"
              style={{ height: "50px" }}
            />
          </div>
          <p className="m-2 text-2xl font-semibold">VoteEasy</p>
        </div>
      </Link>

      {verified ? (
        <div>
          <ul className="hidden md:flex text-xl gap-4 cursor-pointer">
            <li>
              <Link to="home" smooth={true} duration={500}>
                Vote
              </Link>
            </li>
            <li>
              <Link to="projects" smooth={true} duration={500}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500}>
                Guide
              </Link>
            </li>
            <li>
              <Link to="contact" smooth={true} duration={500}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <div onClick={handleClick} className="md:hidden z-10">
            {!nav ? <FaBars /> : <FaTimes />}
          </div>
          {/* Mobile screen menu */}
          <ul
            className={
              !nav
                ? "hidden"
                : "absolute top-20 left-0 w-full h-100 bg-gray-900 flex flex-col rounded-md justify-center items-center"
            }
          >
            <li className="py-6 text-4xl">
              <Link
                onClick={handleClick}
                to="home"
                smooth={true}
                duration={500}
              >
                Home
              </Link>
            </li>
            <li className="py-6 text-4xl">
              <Link
                onClick={handleClick}
                to="projects"
                smooth={true}
                duration={500}
              >
                Projects
              </Link>
            </li>
            <li className="py-6 text-4xl">
              <Link
                onClick={handleClick}
                to="about"
                smooth={true}
                duration={500}
              >
                About
              </Link>
            </li>
            <li className="py-6 text-4xl">
              <Link
                onClick={handleClick}
                to="contact"
                smooth={true}
                duration={500}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link to="/verify-user">
            <button
              onClick={() => {
                setVerified(true);
              }}
              className="p-2 border-2 border-white rounded-md hover:bg-red-500"
            >
              VERIFY
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

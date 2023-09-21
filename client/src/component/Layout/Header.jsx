import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout, reset } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Header = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => setNav(!nav);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="z-20 w-full h-[80px] mb-6 flex justify-between items-center pl-4 pr-12 text-white bg-gray-900">
      <Link to="/">
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

      {user ? (
        <div>
          <ul className="hidden md:flex text-xl gap-4 cursor-pointer">
            <li className="border border-white hover:bg-amber-200 hover:text-black py-1 px-2  rounded-md">
              {user.isAdmin ? (
                <Link to="/admin">Dashboard</Link>
              ) : user.isSuperAdmin ? (
                <Link to="/super-admin">Dashboard</Link>
              ) : (
                <Link to="/verify">VOTE</Link>
              )}
            </li>

            <li className="my-1">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="my-1">
              <Link to="/results">Results</Link>
            </li>
            <button
              onClick={() => {
                dispatch(logout());
                dispatch(reset());
                navigate("/");
              }}
              className="border py-1 px-2 rounded-lg hover:text-amber-400 hover:border-purple-600"
            >
              Sign Out
            </button>
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
                : "z-10 absolute top-20 left-0 w-full h-100 bg-gray-900 flex flex-col rounded-md justify-center items-center"
            }
          >
            <li className="my-6 text-4xl border-2 border-white hover:bg-purple-200 hover:text-black p-2 rounded-md">
              <Link onClick={handleClick} to="/verify">
                Vote
              </Link>
            </li>

            <li className="my-6 text-4xl">
              <Link onClick={handleClick} to="/profile">
                Profile
              </Link>
            </li>
            <li className="my-6 text-4xl">
              <Link onClick={handleClick} to="/results">
                Results
              </Link>
            </li>
            <button
              onClick={() => {
                dispatch(logout());
                dispatch(reset());
                navigate("/");
              }}
              className="border px-4 py-2 my-6 rounded-lg hover:text-amber-400 hover:border-purple-600"
            >
              Sign Out
            </button>
          </ul>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="p-2 border-2 border-white rounded-md hover:bg-red-500">
              LOGIN
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset} from "../redux/authSlice";
import Layout from "../component/Layout/Layout";
import Spinner from "../component/Spinner";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, message, isSuccess, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      setError(null);
    }
      delete userData.confirmPassword;
      const formData = { ...userData};
      try {
        dispatch(register(formData));
        
      } catch (err) {
        console.log(err);
        toast.error(err.message || "An error occurred. Please try again.");
      }
    
  };

  return (
    <Layout>
      {isLoading && <Spinner />}
      <div className=" flex sm:mt-10 mt-20 justify-center mb-10">
        <div className="max-w-md w-full mx-auto p-6   shadow-lg rounded-lg  ">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Name
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                name="fullname"
                onChange={handleChange}
                value={userData.fullname}
                type="text"
                required
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={userData.email}
                type="email"
                required
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={userData.phoneNumber}
                type="text"
                required
                placeholder="Phone Number"
                name="phoneNumber"
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className="relative appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                value={userData.password}
                onChange={handleChange}
                type={passwordVisible ? "text" : "password"}
                required
                placeholder="Password"
                name="password"
              />

              <div
                className="absolute bottom-2 right-2 cursor-pointer"
                onClick={handlePasswordVisibility}
              >
                {passwordVisible ? (
                  <RiEyeOffFill className="text-gray-500" />
                ) : (
                  <RiEyeFill className="text-gray-500" />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>

              <input
                className="relative appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                value={userData.confirmPassword}
                onChange={handleChange}
                type="password"
                required
                placeholder="Confirm Password"
                name="confirmPassword"
              />
            </div>
            {error && (
              <div className="text-red-500 font-semibold mb-2">{error}</div>
            )}

            <button
              className="bg-blue-500 mt-6 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
              type="submit"
              disabled={isLoading}
            >
              Sign up
            </button>

            <div className="text-sm mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

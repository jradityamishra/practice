import React, { useState } from "react";
import Layout from "../component/Layout/Layout";
import { useSelector } from "react-redux";

const CreateCandidate = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    fullname: "",
    partyName: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      setError(null);
    }
  };

  return (
    <Layout>
      <div className=" flex sm:mt-10 mt-20 justify-center mb-10">
        <div className="max-w-md w-full mx-auto p-6  bg-white shadow-lg rounded-lg  ">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register Candidate
          </h2>
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
                htmlFor="partyName"
              >
                Party Name
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={userData.partyName}
                type="partyName"
                required
                placeholder="Party Name"
                name="partyName"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={userData.age}
                type="text"
                required
                placeholder="Phone Number"
                name="age"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="position"
              >
                Position
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={userData.position}
                type="position"
                required
                placeholder="position"
                name="Position"
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
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCandidate;

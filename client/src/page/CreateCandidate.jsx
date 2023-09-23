import React, { useState } from "react";
import Layout from "../component/Layout/Layout";

import axios from "axios";
import { toast } from "react-toastify";

const CreateCandidate = () => {
  const [userData, setUserData] = useState({
    name: "",
    partyName: "",
    position: "",
    age: 0,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("data" + userData);
    try {
      const formData = { ...userData };
      userData.age = parseInt(formData.age, 10); // The second argument specifies the radix (base) for parsing, which is 10 for decimal.

      const res = await axios.post(
        "/registerCandidate/registercandidate",
        userData
      );

      if (res.status === 201) {
        toast.info("Candidate has been added");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                name="name"
                onChange={handleChange}
                value={userData.name}
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
                type="number"
                required
                placeholder="Age"
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
                placeholder="Position"
                name="position"
              />
            </div>

            <button
              className="bg-blue-500 mt-6 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
              type="submit"
              disabled={loading}
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

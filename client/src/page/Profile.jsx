import React from "react";
import Layout from "../component/Layout/Layout";

const Profile = () => {
  //fetch user data from database
  const userData = {
    fullName: "Mickael Poulaz",
    username: "React JS",
    imageSrc:
      "https://static.vecteezy.com/ti/vetor-gratis/p1/2519144-avatar-de-midia-social-gratis-vetor.jpg",
    emailAddress: "m.poul@example.com",
    contact: "9876543210",
    address:
      "To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself",
    voted: false,
  };

  return (
    <Layout>
      <div className="flex justify-center py-8">
        <div className="bg-white max-w-2xl overflow-hidden sm:rounded-lg w-3/4 md:w-1/2 pl-8 shadow-lg shadow-gray-400">
          <div className="px-4 py-4 sm:px-6 flex justify-center">
            <img
              src={userData.imageSrc || "https://via.placeholder.com/150"}
              className="w-48 h-48 mx-auto object-cover border-2 border-gray-400 rounded-full mb-4"
              alt=""
            />
          </div>

          <div className="border-t border-gray-200">
            <dl className="">
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.fullName}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.username}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.emailAddress}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.contact}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.address}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Vote status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.voted ? <p>Voted</p> : <p> Pending</p>}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

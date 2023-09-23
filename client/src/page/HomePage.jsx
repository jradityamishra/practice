import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import HeroImg from "../assets/vote.png";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  // if(user.isSuperAdmin){
  //   navigate('/super-admin')
  // }else if(user.isAdmin){
  //   navigate('/verify')
  // }

  const handleClick = () => {
   if(user.isAdmin){
    navigate("/admin/verify");
   }else{
    navigate('/verify/user')
   }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b">
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                  Your vote matters
                  <div className="relative inline-flex">
                    <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                    <h1 className=" z-10 text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                      Decide and Tap
                    </h1>
                  </div>
                </h1>

                <p className="mt-8 text-base text-black sm:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  iure excepturi nobis, molestiae rerum laboriosam, nam, sit in
                  sequi expedita ratione tenetur tempora sunt illum culpa error
                  corporis doloremque corrupti?
                </p>

                <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                  <button
                    to="/verify"
                    className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
                    role="button"
                    onClick={handleClick}
                  >
                    Get Started
                  </button>
                </div>
              </div>

              <div className="">
                <img
                  className="h-full  shadow-slate-400"
                  src={HeroImg}
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

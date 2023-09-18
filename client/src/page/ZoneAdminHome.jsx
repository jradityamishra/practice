import React from "react";
import Layout from "../component/Layout/Layout";
import { Link } from "react-router-dom";

const ZonalAdminHome = () => {
  const zoneData = {
    zoneId: 42,
    currentVotes: 400,
    totalCapacity: 1000,
  };
  return (
    <Layout>
      <div className="flex items-center justify-center flex-col ">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="max-w-sm font-bold font-sans text-3xl">
            Election 2023 - Zone 42
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center my-10">
          <div className="bg-[#F9ECFF] rounded-xl mr-16">
            <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
              <div className="mt-3 font-semibold text-2xl">
                Zone - {zoneData.zoneId}
              </div>
              <div className="my-8">
                <div className="font-semibold text-lg ">
                  Current vote count : {zoneData.currentVotes}
                </div>
                <br />
                <div className="font-semibold text-lg">
                  Total eligible voters : {zoneData.totalCapacity}
                </div>
              </div>
              <Link to="/admin/verify">
                <button className="bg-[#f4ddff] hover:bg-[#f8908c] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                  New User Vote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZonalAdminHome;

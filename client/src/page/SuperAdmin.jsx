import React, { useState } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";

const SuperAdmin = () => {
  const [selectedZone, setSelectedZone] = useState(""); // State for selected zone
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 9; // Number of items to display per page

  const zoneDB = [
    {
      zoneId: 40,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 50,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 80,
      voteCount: 500,
      voteCapacity: 800,
    },
    {
      zoneId: 45,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 63,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 90,
      voteCount: 500,
      voteCapacity: 800,
    },
    {
      zoneId: 40,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 50,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 80,
      voteCount: 500,
      voteCapacity: 800,
    },
    {
      zoneId: 45,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 63,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 90,
      voteCount: 500,
      voteCapacity: 800,
    },
  ];

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
    setCurrentPage(1); // Reset to the first page when zone changes
  };

  const filteredData = selectedZone
    ? zoneDB.filter((zone) => zone.zoneId === parseInt(selectedZone))
    : zoneDB;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      <div className="flex flex-col my-4">
        <div className="flex justify-center">
          <button className="bg-red-600 p-2 rounded-md text-white">
            End Vote
          </button>
        </div>
        <div>
          {/* Dropdown filter by zone */}
          <div className="my-4 mx-16">
            <label className="mr-2">Filter by Zone:</label>
            <select
              value={selectedZone}
              onChange={handleZoneChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Zones</option>
              {/* Generate options based on unique zone IDs */}
              {[...new Set(zoneDB.map((zone) => zone.zoneId))].map((zoneId) => (
                <option key={zoneId} value={zoneId}>
                  Zone {zoneId}
                </option>
              ))}
            </select>
          </div>

          <Grid container spacing={4} className="p-8">
            {currentData.map((zone, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className="border-2 border-red-400 p-4">
                  <p>Zone : {zone.zoneId}</p>
                  <p>
                    Total Votes : {zone.voteCount}/{zone.voteCapacity}
                  </p>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 p-2 rounded-md ${
                  currentPage === index + 1 ? "bg-red-600 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdmin;

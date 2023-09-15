import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/Login.jsx";
import RegisterPage from "./page/Register.jsx";
import VerifyPage from "./page/Verify";
import Vote from "./page/Vote.jsx";
import Guide from "./page/Guide.jsx";
import Profile from "./page/Profile.jsx";
import axios from "axios";
import Results from "./page/Results.jsx";
import ProtectedRoutes from "./component/ProtectedRoutes.js";
import SuperAdmin from "./page/SuperAdmin.jsx";
const App = () => {
  const refreshAccessToken = async () => {
    try {
      const response = await axios.get("/api/users/refresh-token");
      if (response.status === 403 || response.status === 401) return;
    } catch (error) {
      console.error(error);
    }
  };
 
  const refreshInterval = 60*1000*19;

  setInterval(refreshAccessToken, refreshInterval);

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/verify" element={<VerifyPage />} />
     
      <Route path="/profile" element={<Profile />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/results" element={<Results />} />
      <Route path="/super-admin-dashboard" element={<SuperAdmin />} />

      {/* user protected routes */}
      {/* <Route element={<ProtectedRoutes admin={false} superAdmin={false} />}> 
      
      </Route>  */}

      {/* admin protected routes */}
      {/* <Route element={<ProtectedRoutes admin={true} superAdmin={false} />}>

      </Route> */}

      {/* superadmin protected routes */}
      {/* <Route element={<ProtectedRoutes superAdmin={true} admin={false} />}>
      
      </Route> */}
    </Routes>
  );
};

export default App;

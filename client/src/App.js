import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/Login.jsx";
import RegisterPage from "./page/Register.jsx";
import VerifyPage from "./page/Verify";
import Vote from "./page/Vote.jsx";
import Guide from "./page/Guide.jsx";
import Profile from "./page/Profile.jsx";
import Confirmation from "./page/Confirmation.jsx";
import CreateCandidate from './page/CreateCandidate.jsx'
import axios from "axios";
import Results from "./page/Results.jsx";
import Email from "./page/Email.js";
import ProtectedRoutes from "./component/ProtectedRoutes.js";
import ProtectedRoute2 from "./component/ProtectedRoute2.js";
import ProtectedRoute3 from "./component/ProtectedRoute3.jsx";
import SuperAdmin from "./page/SuperAdmin.jsx";
import ZoneAdminHome from "./page/ZoneAdminHome.jsx";
import ZoneAdminVerify from "./page/ZoneAdminVerify.jsx";
import ZoneAdminVote from "./page/ZoneAdminVote.jsx";
import Adhar from "./page/Adhar.jsx";
import FaceRecognition from "./page/FaceRecognition.js";
import { useEffect } from "react";
import Charts from "./component/Charts.js";
const App = () => {
  return (
    <Routes>
     <Route path="/email/admin" element={<Email />} />
    <Route path='/chart' element={<Charts/>}/>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/vote" element={<Vote />} />

      {/* user protected routes */}
      <Route
       
        element={
          
          <ProtectedRoutes admin={false} superAdmin={false} user={true} />
        }
      >
       <Route path="/confirmed" element={<Confirmation />} />
        <Route element={<ProtectedRoute3 />
        }
      >
          <Route path="/results/user" element={<Results />} />
        </Route>

        <Route element={<ProtectedRoute2 />}>
         <Route path="/verify/user" element={<VerifyPage />} />
        </Route>
        <Route path="/email/user" element={<Email />} />
        <Route path="/facereconition/user" element={<FaceRecognition />} />
        <Route path="/adhar/user" element={<Adhar />} />
        {/* <Route path="/vote" element={<Vote />} /> */}
        <Route path="/profile/user" element={<Profile />} />
      </Route>

      {/* admin protected routes */}
      <Route element={<ProtectedRoutes admin={true} superAdmin={false} user={false} />}>
        <Route path="/admin" element={<ZoneAdminHome />} />
        <Route path="/admin/verify" element={<VerifyPage />} />
        {/* <Route path="/email/admin" element={<Email />} /> */}
        <Route path="/facereconition/admin" element={<FaceRecognition />} />
        {/* <Route path="/vote" element={<Vote />} /> */}
        <Route path="/adhar/admin" element={<Adhar />} />
        {/* <Route path="/admin/verify" element={<ZoneAdminVerify />} /> */}
        {/* <Route path="/admin/vote" element={<ZoneAdminVote />} /> */}

        <Route element={<ProtectedRoute3 />}>
          <Route path="/results/admin" element={<Results />} />
        </Route>
        <Route path="/profile/admin" element={<Profile />} />
      </Route>

      {/* superadmin protected routes */}

      <Route
        element={
          <ProtectedRoutes superAdmin={true} admin={false} user={false} />
        }
      >
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route element={<ProtectedRoute3 />}>
          <Route path="/results/superadmin" element={<Results />} />
        </Route>
        <Route path="/profile/superadmin" element={<Profile />} />
        <Route path="/create-candidate" element={<CreateCandidate />} />
      </Route>
    </Routes>
  );
};

export default App;

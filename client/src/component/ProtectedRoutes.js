import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const ProtectedRoutes = ({ admin, superAdmin,user }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    
    const fetchToken = async () => {
      try {
        const { data } = await axios.get("/api/get-token");
        if (data.token && sessionStorage.getItem("user")) {
          setIsAuth(true);
          if(data.admin==true||data.isSuperAdmin==true){
            setIsSuperAdmin(data.isSuperAdmin);
            setIsAdmin(data.isAdmin);
          }else{
            setIsAdmin(false);
            setIsSuperAdmin(false);
            setIsUser(true);
          }
        } else {
          setIsAuth(false);
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setIsUser(false);
        }
      } catch (err) {
        setIsAuth(false);
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setIsUser(false);
      }
    };
    fetchToken();
  }, []);

  if (isAuth === null) {
    return <Spinner />;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (
    (isAuth && admin && !isAdmin) ||
    (isAuth && superAdmin && !isSuperAdmin)|| (isAuth && user && !isUser)
  ) {
    return (
      <div className="mt-8 mx-auto max-w-lg  text-2xl flex gap-4 justify-center items-center">
        <BsFillExclamationCircleFill className="text-red-500" /> Unauthorized
        access
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;

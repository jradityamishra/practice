import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-mesh">
        <Header />
        <main className="min-h-screen">{children}</main>
        <ToastContainer />
        <Footer />
      </div>
    </>
  );
};

export default Layout;

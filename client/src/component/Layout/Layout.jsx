import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import Chatbot from "./Chatbot";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-mesh">
        <Header />
        <main className="min-h-screen">{children}</main>
        <ToastContainer />
        <Chatbot />
        <Footer />
      </div>
    </>
  );
};

export default Layout;

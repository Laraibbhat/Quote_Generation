import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Layout.css"; // Import styles
import loginBg from "./assest/images/login.jpg";

const Layout = () => {
  return (
    <div
      className="layout"
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <header className="header">
        <Header />
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

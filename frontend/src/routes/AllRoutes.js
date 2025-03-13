import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import QuoteDetail from "../components/QuoteDetail";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute"; // Import PublicRoute

function AllRoutes() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes (Requires Auth) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/quote/:id" element={<QuoteDetail />} />
          </Route>
        </Route>

        {/* Public Routes (Accessible only when NOT logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AllRoutes;

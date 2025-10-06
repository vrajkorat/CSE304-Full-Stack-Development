import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const Role = JSON.parse(localStorage.getItem("auth"));
  return Role?.user?.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AdminRoute;

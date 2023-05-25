import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, isAdmin, adminRoute }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!isAdmin && adminRoute) {
    return <Navigate to="/" replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export interface ProtectedRoutesProps {}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  return <Outlet />;
};

export default ProtectedRoutes;

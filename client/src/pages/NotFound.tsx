import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = ({}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  // if (!isAuthenticated)
  //   return (
  //     <Navigate
  //       to="/login"
  //       replace
  //     />
  //   );

  return (
    <div>
      <h1>Not Found</h1>
      <button onClick={handleNavigate}>Go home</button>
    </div>
  );
};

export default NotFound;

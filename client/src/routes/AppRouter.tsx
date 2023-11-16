import React from "react";
import { useAuth } from "../context/AuthContext";
import { BrowserRouter, Route, RouteObject, Routes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

const AppRouter: React.FC = () => {
  const { authStatus } = useAuth();

  if (authStatus === "checking") {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route: RouteObject) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
        {authStatus === "authenticated" &&
          privateRoutes.map((route: RouteObject) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        {/* {authStatus === "authenticated" && (
          <Route
            path="/*"
            element={<PrivateRoutes />}
          />
        )}
        <Route
          path="/app/*"
          element={<PublicRoutes />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

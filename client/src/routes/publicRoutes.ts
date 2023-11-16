import React from "react";
import { Home, Login, Register } from "../pages";
import { Navigate, RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(Home),
  },
  {
    path: "/login",
    element: React.createElement(Login),
  },
  {
    path: "/register",
    element: React.createElement(Register),
  },
  {
    path: "*",
    element: React.createElement(Navigate, { to: "/", replace: true }),
  },
];

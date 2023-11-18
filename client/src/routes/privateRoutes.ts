import React from "react";
import { Tasks, TaskFormPage, Task, Profile } from "../pages";
import { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  {
    path: "/tasks",
    element: React.createElement(Tasks),
  },
  {
    path: "/add-task",
    element: React.createElement(TaskFormPage),
  },
  {
    path: "/task/:id",
    element: React.createElement(Task),
  },
  {
    path: "/edit/:id",
    element: React.createElement(TaskFormPage),
  },
  {
    path: "/profile",
    element: React.createElement(Profile),
  },
];

import React from "react";
import { Tasks, Task, TaskForm, Profile } from "../pages";
import { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  {
    path: "/tasks",
    element: React.createElement(Tasks),
  },
  {
    path: "/add-task",
    element: React.createElement(TaskForm),
  },
  {
    path: "/task/:id",
    element: React.createElement(Task),
  },
  {
    path: "/profile",
    element: React.createElement(Profile),
  },
];

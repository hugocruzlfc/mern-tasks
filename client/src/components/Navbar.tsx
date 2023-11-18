import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthStatusEnum } from "../types";

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { authStatus, user, logout } = useAuthContext();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-4">
        {authStatus === AuthStatusEnum.AUTHENTICATED ? (
          <>
            <li className="flex">
              <h3 className="font-bold">Welcome: {user?.username}</h3>
              <div className="divider divider-primary divider-horizontal h-5 justify-center pt-1"></div>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/add-task">Add Task</Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => logout()}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

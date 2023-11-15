import React from "react";
import { GoToAuthNavigation } from "../types";
import { AUTH_NAVIGATION_DESCRIPTIONS } from "../utils";
import { Link } from "react-router-dom";

export interface AuthNavigationProps {
  goTo: GoToAuthNavigation;
}

const AuthNavigation: React.FC<AuthNavigationProps> = ({ goTo }) => {
  const description = AUTH_NAVIGATION_DESCRIPTIONS.get(goTo);

  return (
    <p className="flex flex-x-2 justify-between mt-2">
      {description}
      <Link
        className="link link-warning"
        to={`/${goTo}`}
      >
        Go to <span className="capitalize">{goTo}</span>
      </Link>
    </p>
  );
};

export default AuthNavigation;

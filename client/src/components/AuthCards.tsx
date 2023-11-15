import React from "react";

export interface AuthCardsProps {
  title: string;
  children: React.ReactNode;
}

const AuthCards: React.FC<AuthCardsProps> = ({ title, children }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthCards;

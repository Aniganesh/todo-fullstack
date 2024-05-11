import React, { FC } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="py-4 px-6 flex justify-between">
      <span className="text-2xl">Todo app</span>

      <div className="flex gap-4">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to="/signup"
        >
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

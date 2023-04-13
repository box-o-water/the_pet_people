import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">Homepage</NavLink>
          </li>
          <li>
            <NavLink to="/profile">profile</NavLink>
          </li>
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">sign up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

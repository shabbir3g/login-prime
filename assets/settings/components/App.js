import React from "react";
import { Outlet, NavLink } from "react-router";

const App = () => {
  return (
    <div className="login-prime-container">
      <ul className="loginprime-menu">
        <li>
          <NavLink to="/">Setting</NavLink>
        </li>
        <li>
          <NavLink to="/style">Style</NavLink>
        </li>
        <li>
          <NavLink to="/advanced">Advanced</NavLink>
        </li>
        <li>
          <NavLink to="/info">Info</NavLink>
        </li>
        <li>
          <NavLink to="/add-ons">Add-Ons</NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default App;

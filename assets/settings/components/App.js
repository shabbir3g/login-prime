import React from "react";
import { Outlet, NavLink } from "react-router";

const App = () => {
  return (
    <div className="login-prime-container">
      <div className="header">
        <h1>Login Prime</h1>
        <span className="version">v2.1</span>
      </div>

      <div className="login-prime-menu">
        <nav className="prime-nav">
          <ul>
            <li>
              <NavLink to="/">
                <i className="dashicons dashicons-admin-settings"></i>Core
                Setting
              </NavLink>
            </li>
            <li>
              <NavLink to="/style">
                <i className="dashicons dashicons-admin-appearance"></i>Style
              </NavLink>
            </li>
            <li>
              <NavLink to="/advanced">
                <i className="dashicons dashicons-admin-generic"></i>Advanced
              </NavLink>
            </li>
            <li>
              <NavLink to="/info">
                <i className="dashicons dashicons-info"></i>Info
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-ons">
                <i className="dashicons dashicons-admin-plugins"></i>Add-Ons
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default App;

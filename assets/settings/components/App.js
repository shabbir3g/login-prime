import React from "react";
import { Outlet, NavLink, Link } from "react-router";

const App = () => {
  return (
    <>
      <h1>Hello Login Prime Mostafiz</h1>
      <ul>
        <li>
          <Link to="/">Setting</Link>
          <li>
            <Link to="/style">Style</Link>
          </li>
          <li>
            <Link to="/advanced">Advanced</Link>
          </li>
          <NavLink to="/info">Info</NavLink>
        </li>
        <li>
          <Link to="/add-ons">Add-Ons</Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};

export default App;

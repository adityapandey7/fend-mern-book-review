import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

import { AuthContext } from "../../context/auth-context";

function NavLinks() {
  const auth = useContext(AuthContext);
  return (
    <>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Reviews</NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/review/new">Add Review</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">Authenticate</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>Log Out</button>
          </li>
        )}
      </ul>
    </>
  );
}

export default NavLinks;

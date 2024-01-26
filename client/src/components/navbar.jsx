import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand font-weight-bold" to="/">
          FrameFusion
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

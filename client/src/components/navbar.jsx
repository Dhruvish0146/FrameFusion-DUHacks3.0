import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  const user = useSelector(state => state.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand font-weight-bold" to="/">
          FrameFusion
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            {!user && (
              <>
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
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                <NavLink className="nav-link" to='/'>
                  {user._id}
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

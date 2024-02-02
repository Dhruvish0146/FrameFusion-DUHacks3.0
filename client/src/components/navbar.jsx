import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  const userId = useSelector(state => state.userId);
  const name = useSelector(state => state.name);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand font-weight-bold" to="/">
          FrameFusion
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">

            {!userId && (
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

            {userId && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/profile/${userId._id}`}>
                    {name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/addArt">
                      Add New Art
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

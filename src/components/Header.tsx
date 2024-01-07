import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Header = () => {
  const context = useContext(UserContext);

  const [hideHeader, setHideHeader] = useState(false);
  console.log("path: ", window.location.pathname);

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  const handleLogout = () => {
    context.logout();
    toast.success("Logout successfully");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand>User Manage Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {((context.user && context.user.auth) ||
            window.location.pathname === "/") && (
            <>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Manage users
              </NavLink>
            </>
          )}
        </Nav>
        <Nav>
          {context.user && context.user.email && (
            <span className="nav-link">Welcome {context.user?.email}</span>
          )}
          <NavDropdown title="Setting" id="basic-nav-dropdown">
            {context.user?.auth === true ? (
              <div className="basic-nav-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="basic-nav-dropdown">
                <NavLink to="/login" className="dropdown-item">
                  Login
                </NavLink>
              </div>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

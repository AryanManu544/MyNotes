import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    document.body.setAttribute("data-theme", props.mode);
  }, [props.mode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className={`navbar navbar-${props.mode} bg-${props.mode} navbar-expand-lg`}>
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/">MyNotes</Link>
          
          {/* Navbar Toggler Button (for smaller screens) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
            </ul>
          </div>

          {/* Dark Mode Toggle Button */}
          <button className="theme-toggle mx-2" onClick={props.toggleMode}>
            {props.mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Always Visible Login / Signup Buttons */}
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-primary" to="/signup">Signup</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  let navigate = useNavigate();

  // Function to handle logout and redirect to home
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="topbarContainer">
      <nav className="navbar">
        {/* Left Section - Logo */}
        <div className="navbarBrand">
          <Link to="/" className="logoLink">
            <span className="logo">CaptionCraft</span>
          </Link>
        </div>

        {/* Right Section - Authentication (Logout Button if logged in) */}
        <div className="navAuth">
          {localStorage.getItem('token') ? (
            <button
              onClick={handleLogout}
              className="logoutButton"
              style={{ marginRight: "42px" }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="authLink">Sign in</Link>
              <Link to="/register" className="authLink">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

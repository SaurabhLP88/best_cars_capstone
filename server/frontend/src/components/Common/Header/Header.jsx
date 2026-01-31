import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/style.css";
import "../../../assets/css/bootstrap.min.css";

const Header = () => {
  const [username, setUsername] = useState(
    sessionStorage.getItem("username")
  );
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    const res = await fetch("/djangoapp/logout", { method: "GET" });
    const json = await res.json();

    if (json) {
      sessionStorage.removeItem("username");
      setUsername(null);
      alert("Logged out successfully");
      navigate("/");
    }
  };

  // Sync username if sessionStorage changes (page refresh)
  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "darkturquoise", height: "1in" }}
    >
      <div className="container-fluid">
        <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>

          <span className="navbar-text">
            {username ? (
              <div className="input_panel">
                <span className="username">{username}</span>
                <a href="/" className="nav_item" onClick={logout}>
                  Logout
                </a>
              </div>
            ) : (
              <div className="input_panel">
                <Link className="nav_item" to="/login">Login</Link>
                <Link className="nav_item" to="/register">Register</Link>
              </div>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;

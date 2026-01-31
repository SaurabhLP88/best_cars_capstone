import React, { useState } from "react";
import Header from "../../Common/Header/Header";
import "./Register.css";

import user_icon from "../../../assets/icons/person.png";
import email_icon from "../../../assets/icons/email.png";
import password_icon from "../../../assets/icons/password.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const register_url = "/djangoapp/register";

  // ---------- VALIDATION ----------
  const validate = () => {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (!/^[a-zA-Z0-9._]{3,50}$/.test(userName.trim())) {
      newErrors.userName =
        "Username must be 3–50 characters (letters, numbers, . _)";
    }

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const register = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim(),
          password: password.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });

      const json = await res.json();

      if (json.status === "Authenticated") {
        sessionStorage.setItem("username", json.userName);
        window.location.href = "/";
      } else if (json.error === "Already Registered") {
        setServerError("Username already registered");
      } else {
        setServerError("Registration failed. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- RESET ----------
  const handleReset = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setErrors({});
    setServerError("");
  };

  return (
    <div>
      <Header />

      <div className="register_container" style={{ width: "50%" }}>
        <div className="header">
          <span className="text">Sign Up</span>
          <hr />
        </div>

        <form onSubmit={register} noValidate>
          <div className="inputs">
            {/* Username */}
            <div className="input">
              <img src={user_icon} className="img_icon" alt="Username" />
              <input
                type="text"
                placeholder="Username"
                className="input_field"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            {errors.userName && (
              <div className="error_text">{errors.userName}</div>
            )}

            {/* First Name */}
            <div className="input">
              <img src={user_icon} className="img_icon" alt="First Name" />
              <input
                type="text"
                placeholder="First Name"
                className="input_field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {errors.firstName && (
              <div className="error_text">{errors.firstName}</div>
            )}

            {/* Last Name */}
            <div className="input">
              <img src={user_icon} className="img_icon" alt="Last Name" />
              <input
                type="text"
                placeholder="Last Name"
                className="input_field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {errors.lastName && (
              <div className="error_text">{errors.lastName}</div>
            )}

            {/* Email */}
            <div className="input">
              <img src={email_icon} className="img_icon" alt="Email" />
              <input
                type="email"
                placeholder="Email"
                className="input_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <div className="error_text">{errors.email}</div>
            )}

            {/* Password */}
            <div className="input">
              <img src={password_icon} className="img_icon" alt="Password" />
              <input
                type="password"
                placeholder="Password"
                className="input_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <div className="error_text">{errors.password}</div>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="error_text server_error">{serverError}</div>
          )}

          {/* Buttons */}
          <div className="submit_panel">
            <button type="submit" className="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <button
              type="button"
              className="submit"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <a href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

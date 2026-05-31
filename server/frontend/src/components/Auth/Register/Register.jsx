import React, { useState } from "react";

import Copyright from "../../Common/Footer/Copyright";

import "./Register.css";

import logoImg from "../../../assets/images/logos/bestcars_dark_01.png";
import bgImg from "../../../assets/images/auths-01.jpg";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const API = process.env.REACT_APP_API_URL;
  const register_url = `${API}/djangoapp/register`;

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
    <>
    
      {/* Page loader */}
      {loading && <div id="preloader" className={!loading ? "fade-out" : ""}></div>}

      <section className="hero-area d-flex align-items-center justify-content-center" id="login" style={{ height: "100vh", paddingTop: "0px", backgroundImage: `url(${bgImg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="contact-form" style={{ margin: "0", }}>
                <div className="logo text-center mb-4">
                  <a href="/"><img src={logoImg} alt="logo" style={{height: "32px"}} /></a>
                </div>
                <h4>Sign Up</h4>
                <p className="form-message"></p>
                <form className="login_panel" onSubmit={register} noValidate>
                    {errors.userName && (
                      <div className="error_text">{errors.userName}</div>
                    )}
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />                  
                    
                    {errors.firstName && (
                      <div className="error_text">{errors.firstName}</div>
                    )}
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />                  

                    {errors.lastName && (
                      <div className="error_text">{errors.lastName}</div>
                    )}
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />                  

                    {errors.email && (
                      <div className="error_text">{errors.email}</div>
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    {errors.password && (
                      <div className="error_text">{errors.password}</div>
                    )}
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />                  

                    <div className="login-buttons">
                      <button
                        type="button"
                        name="reset"
                        onClick={handleReset}
                        disabled={loading}
                        className="secondary-btn"
                      >
                        Reset
                      </button>
                      
                      <button type="submit" name="register" disabled={loading} className="primary-btn">
                        {loading ? "Registering..." : "Register"}
                      </button>
                    </div>

                    {/* Server Error */}
                    {serverError && (
                      <div className="error_text server_error">{serverError}</div>
                    )}
                    <hr />

                    <p className="m-0 text-center">
                      Already have an account?{" "}
                      <a href="/login">
                        Login
                      </a>
                    </p>

                </form>
              </div>
            </div>
          </div>

          <div className="text-white text-center mt-4">
            <Copyright />
          </div>
          
        </div>
      </section>   

    </>

  );
};

export default Register;

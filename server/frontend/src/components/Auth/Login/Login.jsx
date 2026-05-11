import React, { useState } from "react";

import Copyright from "../../Common/Footer/Copyright";

import "./Login.css";

import logoImg from "../../../assets/images/logos/bestcars_dark_01.png";
import bgImg from "../../../assets/images/auths-01.jpg";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const login_url = "/djangoapp/login";

  // ---------- VALIDATION ----------
  const validate = () => {
    const newErrors = {};

    const trimmedUser = userName.trim();
    const trimmedPass = password.trim();

    // Username validation
    if (!trimmedUser) {
      newErrors.userName = "Username is required";
    } else if (trimmedUser.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    } else if (trimmedUser.length > 50) {
      newErrors.userName = "Username cannot exceed 50 characters";
    } else if (!/^[a-zA-Z0-9._]+$/.test(trimmedUser)) {
      newErrors.userName = "Only letters, numbers, . and _ allowed";
    }

    // Password validation
    if (!trimmedPass) {
      newErrors.password = "Password is required";
    } else if (trimmedPass.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (trimmedPass.length > 64) {
      newErrors.password = "Password cannot exceed 64 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const login = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(login_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim(),
          password: password.trim(),
        }),
      });

      const json = await res.json();

      if (json.status === "Authenticated") {
        sessionStorage.setItem("username", json.userName);
        window.location.href = "/";
      } else {
        setServerError("Invalid username or password");
      }
    } catch (err) {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserName("");
    setPassword("");
    setErrors({});
    setServerError("");
  };

  return (
    <>

      {/* Page loader */}
      {loading && <div id="preloader" className={!loading ? "fade-out" : ""}></div>}

      <section className="hero-area d-flex align-items-center justify-content-center" id="login" style={{ height: "100vh", paddingTop: "0px", backgroundImage: `url(${bgImg})`  }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="contact-form m-0">
                <div className="logo text-center mb-4">
                  <a href="/"><img src={logoImg} alt="logo" style={{height: "32px"}} /></a>
                </div>
                <h4>Login</h4>
                <p className="form-message"></p>
                <form className="login_panel" onSubmit={login} noValidate>
                    {errors.userName && (
                      <p className="error_text">{errors.userName}</p>
                    )}
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    {errors.password && (
                      <p className="error_text">{errors.password}</p>
                    )}
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    
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
                      <button
                        type="submit" 
                        name="login"
                        disabled={loading}
                        className="primary-btn ml-2"
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    {serverError && (
                      <div className="error_text server_error">{serverError}</div>
                    )}

                    <hr />

                    <p className="m-0 text-center">
                      Don't have an account? <a href="/register">Register Now</a>
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

export default Login;

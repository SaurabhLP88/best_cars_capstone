import React, { useState } from "react";
import Header from "../../Common/Header/Header";
import "./Login.css";

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
    <div>
      <Header />

      <div className="modalContainer">
        <form className="login_panel" onSubmit={login} noValidate>
          <h3>Login</h3>

          {/* Username */}
          <div>
            <label>Username</label>
            <input
              type="text"
              value={userName}
              placeholder="Username"
              className="input_field"
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && (
              <div className="error_text">{errors.userName}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="input_field"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="error_text">{errors.password}</div>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="error_text server_error">{serverError}</div>
          )}

          {/* Actions */}
          <div>
            <button
              type="submit"
              className="action_button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="action_button"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>

          <a className="loginlink" href="/register">
            Register Now
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;

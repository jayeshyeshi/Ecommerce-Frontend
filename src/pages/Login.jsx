import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../services/Api";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // <-- React Router hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

   try {

      const response = await API.post("/auth/login", {
        userName: username,
        password,
      });

      // Axios puts the response body in response.data
      const data = response.data;

      console.log("Login success:", data);

      // Save token in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.userId);


      alert(data.message);
      // Redirect to profile page
      navigate("/profile");

    } catch (error) {
        // Axios provides error.response if server returned an error
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button type="submit">Login</button>
          
          <p className="register-text">
            Not a member? <Link to="/register">Register Now</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
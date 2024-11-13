import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Signup/index.css";

function Signup({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          className="signup-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="signup-button" type="submit">
          Signup
        </button>
      </form>
      <p className="signup-footer">
        Already have an account?{" "}
        <Link to="/login" className="signup-link">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Signup;

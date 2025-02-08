import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const Signup = ({ mode, showalert }) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  useEffect(() => {
    // Apply dark mode styles dynamically when mode changes
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:4000/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        showalert("Account created successfully", "success");
        navigate("/");
      } else {
        showalert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        backgroundColor: mode === "dark" ? "#1a1a1a" : "#ffffff",
        color: mode === "dark" ? "#ffffff" : "#1a1a1a",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "4rem auto",
        boxShadow: mode === "dark" ? "0px 0px 10px rgba(255, 255, 255, 0.2)" : "0px 0px 10px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
            id="name"
            style={{
              backgroundColor: mode === "dark" ? "#2d2d2d" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#1a1a1a",
              border: "1px solid",
              borderColor: mode === "dark" ? "#3f3f46" : "#e4e4e7",
              transition: "background-color 0.3s, color 0.3s",
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="email"
            aria-describedby="emailHelp"
            style={{
              backgroundColor: mode === "dark" ? "#2d2d2d" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#1a1a1a",
              border: "1px solid",
              borderColor: mode === "dark" ? "#3f3f46" : "#e4e4e7",
              transition: "background-color 0.3s, color 0.3s",
            }}
          />
          <div className="form-text" style={{ color: mode === "dark" ? "#a1a1aa" : "#6b7280" }}>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
            style={{
              backgroundColor: mode === "dark" ? "#2d2d2d" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#1a1a1a",
              border: "1px solid",
              borderColor: mode === "dark" ? "#3f3f46" : "#e4e4e7",
              transition: "background-color 0.3s, color 0.3s",
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            id="cpassword"
            style={{
              backgroundColor: mode === "dark" ? "#2d2d2d" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#1a1a1a",
              border: "1px solid",
              borderColor: mode === "dark" ? "#3f3f46" : "#e4e4e7",
              transition: "background-color 0.3s, color 0.3s",
            }}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

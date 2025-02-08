import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import your CSS file

export const Login = ({ mode, showalert }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    useEffect(() => {
        document.body.setAttribute("data-theme", mode);
    }, [mode]);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            if (json.success) {
                localStorage.setItem("token", json.authtoken);
                showalert("Logged in successfully", "success");
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
            className="login-container"
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
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
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

                <button type="submit" className="btn btn-outline-primary w-100">Sign In</button>
            </form>

            <div className="signup-link text-center mt-3">
                Don't have an account? <Link to="/signup" style={{ color: "#2563eb" }}>Sign up</Link>
            </div>
        </div>
    );
};

export default Login;

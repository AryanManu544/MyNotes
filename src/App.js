import "./App.css";
//import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/notestate"; 
import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [alert, setalert] = useState({});
  
  const showalert = (message, type) => {
    console.log("showalert called with:", message, type);
    setalert({ msg: message, type: type });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <NoteState>
      <Navbar  mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          {/* Wrap the Home route with ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home mode={mode} toggleMode={toggleMode} showalert={showalert} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login mode = {mode} showalert={showalert} />} />
          <Route path="/signup" element={<Signup mode={mode} showalert={showalert} />} />
        </Routes>
        <Analytics />
      </div>
    </NoteState>
  );
}

export default App;

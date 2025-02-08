import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/notestate"; 
import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

function App() {
  const [alert, setalert] = useState({});
  
  const showalert = (message, type) => {
    console.log("showalert called with:", message, type);
    setalert({ msg: message, type: type });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };

  return (
    <NoteState>
      <Navbar />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          {/* Wrap the Home route with ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home showalert={showalert} />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showalert={showalert} />} />
          <Route path="/signup" element={<Signup showalert={showalert} />} />
        </Routes>
      </div>
    </NoteState>
  );
}

export default App;

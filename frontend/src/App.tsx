import { useEffect } from "react";
import { isUserAuthenticated } from "./helpers/auth";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated() && window.location.pathname !== "/register") {
      navigate("/login");
    }
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;

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
    const userIsAuthenticated = isUserAuthenticated()?.isAuth;
    if (userIsAuthenticated) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;

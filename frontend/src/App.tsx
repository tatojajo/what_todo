import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useEffect } from "react";
import { isUserAuthenticated } from "./helpers/auth";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = isUserAuthenticated()?.isAuth;
    const currentPath = window.location.pathname;

    if (isAuthenticated && currentPath !== "/register") {
      navigate("/home");
    }
  }, []);

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

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
    if (!isUserAuthenticated()) navigate("/login");
    if (isUserAuthenticated()) navigate("/home");
  }, [isUserAuthenticated()]);

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;

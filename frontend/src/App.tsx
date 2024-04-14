import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { isUserAuthenticated } from "./helpers/auth";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = isUserAuthenticated()?.isAuth;
    if (!isAuthenticated) {
      navigate("/");
    }
    if(token){
      navigate('/home')
    }
  }, [navigate]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;

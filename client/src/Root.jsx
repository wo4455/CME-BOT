import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import App from "./App.jsx";
import { useState } from "react";

const Root = () => {
  const [userData, setUserData] = useState({});

  const handleUserData = (userData) => {
    setUserData(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<App userData={userData} onLogout={handleUserData} />}
        />
        <Route
          exact
          path="/auth"
          element={<Login onLogin={handleUserData} />}
        />
        <Route
          exact
          path="/new"
          element={<Signup onLogin={handleUserData} />}
        />
      </Routes>
    </Router>
  );
};

export default Root;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import TaskInfinityScroll from "./components/TaskInfinityScroll";
// import { AuthProvider } from "./AuthContext"; // Import here if not in index.js

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TaskInfinityScroll />} />
      </Routes>
    </div>
  );
};

export default App;

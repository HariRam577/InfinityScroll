import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./Auth/Login";
import TaskInfinityScroll from "./components/TaskInfinityScroll";
import ViewProduct from "./components/ViewProduct";
// import Content from "./Content";
import ProtectedLayout from "./components/ProtectedLayout";
import { authContext } from "./Auth/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <TaskInfinityScroll />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/content"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <Content />
              </ProtectedLayout>
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <ViewProduct />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
};

export default App;

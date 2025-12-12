import React from "react";
import { Navigate } from "react-router-dom";

const HighAuth = (Component) => {
  return (props) => {
    const checkLogin = localStorage.getItem("isLogin");
    if (!checkLogin) {
      return <Navigate to="/login" replace />;
    }
    return <Component {...props} />;
  };
};

export default HighAuth;

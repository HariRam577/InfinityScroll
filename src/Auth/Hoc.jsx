import React from "react";
import { Navigate } from "react-router-dom";

const Hoc = (Component) => {
  return (props) => {
    const checkLogin = localStorage.getItem("isLogin");
    if (!checkLogin) {
      return <Navigate to="/login" replace />;
    }
    return <Component {...props} />;
  };
};

export default Hoc;

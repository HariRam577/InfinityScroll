import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLogin = localStorage.getItem("isLogin");
    return savedLogin ? JSON.parse(savedLogin) : false;
  });

  const navigate = useNavigate(); // Fixed variable name

  const loggedin = (data) => {
    if (data.email === "hari@gmail.com" && data.password === "hari@123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLogin", "true"); // Store as string
      navigate("/"); // Fixed variable name
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLogin");
    navigate("/login"); // Redirect to login on logout
  };

  return (
    <authContext.Provider value={{ loggedin, isLoggedIn, logout }}>
      {children}
    </authContext.Provider>
  );
};

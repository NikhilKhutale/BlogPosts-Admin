import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (values) => {
    const res = await axios.post("api/adminAuth/login", values);
    setCurrentUser(res.data);
  };

  const register = async (values) => {
    const res = await axios.post("api/adminAuth/register", values);
    //setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("api/adminAuth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};
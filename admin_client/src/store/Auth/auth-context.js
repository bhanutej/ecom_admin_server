import React, { useState } from "react";

const AuthContext = React.createContext({
  currentUser: null,
  token: null,
  isLoggedIn: false,
  login: (user, token, expiresIn) => {},
  logout: () => {},
});

const calculateRemainingTime = (expireTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expireTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  const loginHandler = (user, token, expiresIn) => {
    setCurrentUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    const remainingTime = calculateRemainingTime(expiresIn);
    setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    currentUser,
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

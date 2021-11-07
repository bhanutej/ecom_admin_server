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

const jwtParse = (token) => {
  const userObjtoken = token.split(".")[1];
  const finalToken = userObjtoken.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(finalToken)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const tokenRemainingTime = (token) => {
  const userObject = jwtParse(token);
  const expireTime = new Date(+userObject.exp * 1000).toISOString();
  const remainingDuration = calculateRemainingTime(expireTime);
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

  if (initialToken) {
    const tokenRemainingDuration = tokenRemainingTime(initialToken);
    if (tokenRemainingDuration && tokenRemainingDuration < 0) {
      logoutHandler();
    }
  }

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

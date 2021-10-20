import React, { useState } from "react";

const AuthContext = React.createContext({
  currentUser: null,
  isLoggedIn: false,
  login: (user) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = !!currentUser;
  const loginHandler = (user) => {
    setCurrentUser(user);
  };
  const logoutHandler = () => {
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
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

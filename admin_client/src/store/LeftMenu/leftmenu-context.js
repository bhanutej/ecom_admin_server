import React, { useState } from "react";

const LeftmenuContext = React.createContext({
  isVisible: false,
  menuVisibility: (visible) => {},
});

export const LeftmenuContextProvider = (props) => {
  const [visible, setVisible] = useState(false);
  const isVisible = !!visible;
  const menuVisibilityHandler = (visibility) => {
    setVisible(visibility);
  };

  const contextValue = {
    isVisible,
    menuVisibility: menuVisibilityHandler,
  };

  return (
    <LeftmenuContext.Provider value={contextValue}>
      {props.children}
    </LeftmenuContext.Provider>
  );
};

export default LeftmenuContext;

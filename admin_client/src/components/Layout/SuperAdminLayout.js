import { Fragment } from "react";

import Header from "./Header/Header";
import LeftMenu from "./LeftMenu/LeftMenu";
import { LeftmenuContextProvider } from "../../store/LeftMenu/leftmenu-context";

const SuperAdminLayout = (props) => {
  return (
    <Fragment>
      <LeftmenuContextProvider>
        <Header />
        <LeftMenu />
      </LeftmenuContextProvider>
      SuperAdmin
      <main>{props.children}</main>
    </Fragment>
  );
};

export default SuperAdminLayout;

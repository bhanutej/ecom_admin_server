import { Fragment, useContext } from "react";
import { Drawer } from "antd";

import LeftmenuContext from "../../../store/LeftMenu/leftmenu-context";
import classes from "./LeftMenu.module.css";

const LeftMenu = () => {
  const leftMenuContext = useContext(LeftmenuContext);
  const isVisible = leftMenuContext.isVisible;

  return (
    <Fragment>
      <Drawer
        placement={"left"}
        visible={isVisible}
        onClose={() => leftMenuContext.menuVisibility(!isVisible)}
        className={classes.DrawerContainer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Fragment>
  );
};

export default LeftMenu;

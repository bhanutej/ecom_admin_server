import { Fragment, useContext } from "react";
import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";

import LeftmenuContext from "../../../store/LeftMenu/leftmenu-context";
import classes from "./LeftMenu.module.css";

const menuItems = [
  {
    menuLabel: "Admins",
    route: "/admins",
    icon: "",
  },
  {
    menuLabel: "Organizations",
    route: "/organizations",
    icon: "",
  },
];

const RenderMenuItems = () => {
  return (
    <Menu>
      {menuItems.map((menuItem) => {
        return (
          <Menu.Item key={menuItem.menuLabel} icon={null}>
            <Link to={menuItem.route}>{menuItem.menuLabel}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

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
        <RenderMenuItems />
      </Drawer>
    </Fragment>
  );
};

export default LeftMenu;

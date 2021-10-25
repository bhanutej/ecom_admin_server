import { Fragment, useContext } from "react";
import { Avatar } from "antd";
import { Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

import classes from "./Header.module.css";
import AuthContext from "../../../store/Auth/auth-context";
import LeftmenuContext from "../../../store/LeftMenu/leftmenu-context";

const Header = () => {
  const authContext = useContext(AuthContext);
  const leftmenuContext = useContext(LeftmenuContext);
  const isVisible = leftmenuContext.isVisible;
  const { currentUser, logout } = authContext;
  const logoutHandler = () => {
    logout();
  };
  const menu = (
    <Menu>
      <Menu.Item>{currentUser.email}</Menu.Item>
      <Menu.Item>
        <div onClick={logoutHandler}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <div className={classes.Header}>
        <div
          className={classes.Logo}
          onClick={() => leftmenuContext.menuVisibility(!isVisible)}
        >
          LOGO
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;

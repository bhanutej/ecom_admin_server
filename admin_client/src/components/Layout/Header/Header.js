import { Fragment, useContext } from "react";
import { Avatar } from "antd";
import { Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import AuthContext from "../../../store/auth-context";

const Header = () => {
  const authContext = useContext(AuthContext);
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
        <div className={classes.Logo}>LOGO</div>
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

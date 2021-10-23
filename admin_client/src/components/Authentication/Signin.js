import { Fragment, useState, useContext } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import AuthContext from "../../store/auth-context";
import classes from "./Signin.module.css";
import { notifyMessage } from "../../utilities/NotifyMessages";

const Signin = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/sign_in", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        const { user, token, expiresIn } = data;
        const expirationTime = new Date(+expiresIn * 1000);
        authContext.login(user, token, expirationTime.toISOString());
      })
      .catch(({ response }) => {
        const { errors } = response.data;
        notifyMessage("error", errors[0]);
      });
  };

  return (
    <Fragment>
      <div className={classes.SigninContainer}>
        <div className={classes.SigninContent}>
          <Form name="basic" autoComplete="off">
            <div className={classes.SigninLabel}>Sign in:</div>
            <Form.Item name="email">
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                className={classes.login_form_button}
                onClick={(e) => signInHandler(e)}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;

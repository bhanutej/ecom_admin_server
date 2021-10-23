import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";

import AuthContext from "../store/auth-context";
import Users from "./Users";
import Signin from "./Authentication/Signin";
import Layout from "./Layout/Layout";
import SuperAdminLayout from "./Layout/SuperAdminLayout";
import { DatePicker } from "antd";

const App = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, currentUser } = authContext;
  return (
    <div>
      <BrowserRouter>
        {!currentUser ? (
          <Signin />
        ) : currentUser["role"] === "USER" ? (
          <Layout>
            {isLoggedIn ? <DatePicker /> : null}
            <Users />
          </Layout>
        ) : (
          <SuperAdminLayout>
            {isLoggedIn ? <DatePicker /> : null}
            <Users />
          </SuperAdminLayout>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

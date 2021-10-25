import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";

import AuthContext from "../store/Auth/auth-context";
import Users from "./Users";
import Signin from "./Authentication/Signin";
import Layout from "./Layout/Layout";
import SuperAdminLayout from "./Layout/SuperAdminLayout";

const App = () => {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;
  return (
    <div>
      <BrowserRouter>
        {!currentUser ? (
          <Signin />
        ) : currentUser["role"] === "USER" ? (
          <Layout>
            <Users />
          </Layout>
        ) : (
          <SuperAdminLayout></SuperAdminLayout>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

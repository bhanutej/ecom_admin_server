import { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import AuthContext from "../store/Auth/auth-context";
import Users from "./Users";
import Signin from "./Authentication/Signin";
import Layout from "./Layout/Layout";
import SuperAdminLayout from "./Layout/SuperAdminLayout";
import Organizations from "./Organizations/Organizations";

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
          <SuperAdminLayout>
            <Switch>
              <Route exact path="/">
                <Users />
              </Route>
              <Route exact path="/admins">
                <Users />
              </Route>
              <Route exact path="/organizations">
                <Organizations />
              </Route>
            </Switch>
          </SuperAdminLayout>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

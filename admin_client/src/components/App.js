import { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";

import AuthContext from "../store/auth-context";
import Users from "./Users";
import Signin from "./Signin";
import Layout from "./Layout/Layout";
import { DatePicker } from "antd";

const App = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;
  return (
    <div>
      <BrowserRouter>
        <Layout>
          {isLoggedIn ? <DatePicker /> : <Signin />}
          <Users />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;

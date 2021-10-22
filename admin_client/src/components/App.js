import { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import AuthContext from "../store/auth-context";
import Users from "./Users";
import Signin from "./Signin";

const App = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

  useEffect(() => {
    try {
      axios.get("/api/current_user").then(({ data }) => {
        authContext.login(data);
      });
    } catch (error) {
      console.log("error", error);
    }
  }, [authContext]);
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn ? <div>Hello</div> : <div>Hi</div>}
        <Signin />
        <Users />
      </BrowserRouter>
    </div>
  );
};

export default App;

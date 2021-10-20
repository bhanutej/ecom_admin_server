import { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import AuthContext from "../store/auth-context";

const App = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;
  useEffect(() => {
    axios.get("/api/current_user").then(({ data }) => {
      authContext.login(data);
    });
  }, [isLoggedIn]);
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn ? <div>Hello</div> : <div>Hi</div>}
      </BrowserRouter>
    </div>
  );
};

export default App;

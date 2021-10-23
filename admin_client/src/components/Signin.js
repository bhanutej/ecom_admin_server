import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";

import axios from "axios";

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
      .catch((ex) => {
        console.log("ex>>>>", ex);
      });
  };
  return (
    <div>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => signInHandler(e)}>Signin</button>
    </div>
  );
};

export default Signin;

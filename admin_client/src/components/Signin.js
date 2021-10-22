import { useState } from "react";

import axios from "axios";

const Signin = () => {
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
        console.log(data);
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

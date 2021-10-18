const express = require("express");
const app = express();

app.get("/", () => {
  res.send({ ht: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

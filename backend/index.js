const express = require("express");
const app = express();
const port = 5000;
const todos = require("./routers/todos");
const users = require("./routers/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authJwt = require("./helpers/jwt");
require("dotenv/config");

// app.use(authJwt());
app.use(bodyParser.json());
app.use("/api/todos", todos);
app.use("/api/users", users);

// Database connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "todo",
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
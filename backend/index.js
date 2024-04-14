const express = require("express");
const app = express();
const port = 5000;
const todos = require("./routers/todos");
const users = require("./routers/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authJwt = require("./helpers/jwt");
const cors = require("cors");
const path = require("path");
require("dotenv/config");

// app.use(express.static(path.join(__dirname, "dist")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/index.html"));
// });

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use("/api/users", users);
app.use(authJwt());
app.use("/api/todos", todos);

// Database connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "todo",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

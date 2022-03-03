const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
// require("./config/db").connectToDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const PREFIX = process.env.PREFIX || "/api";

// root route
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// category routes
app.use(PREFIX, require('./routes/category'));

// running server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

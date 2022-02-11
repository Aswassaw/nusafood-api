const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
// require("./config/db").connectToDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Halo Bambang",
  });
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

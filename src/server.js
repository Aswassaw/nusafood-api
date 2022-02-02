const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Halo Bambang",
  });
});

const port = 5000;

app.listen(port, () => {
  console.log("Server running on port " + port);
});

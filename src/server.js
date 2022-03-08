const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const createError = require("http-errors");
const chalk = require("chalk");
require("dotenv").config();
require("./config/db").connectToDB();

const app = express();

// env variables
const NODE_ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.PORT || 5000;
const PREFIX = process.env.PREFIX || "/api";

// middlewares
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// morgan & cors
if (NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://localhost:3000"],
      optionsSuccessStatus: 200, // For legacy browser support
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({ origin: ["http://localhost:3000", "https://localhost:3000"] })
  );
}

// root route
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// category routes
app.use(PREFIX, require("./routes/category"));
// dish routes
app.use(PREFIX, require("./routes/dish"));

// 404 route
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  let status = err.status || 500;

  res.status(status).json({
    error: {
      status,
      message: err.message || "Internal Server Error",
    },
  });
});

// running server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} with ${NODE_ENV} environment`);
  console.log(chalk`Visit {rgb(128, 237, 153) http://localhost:${PORT}}`);
  console.log(chalk`Developed by {rgb(255, 92, 88) Andry Pebrianto}`);
});

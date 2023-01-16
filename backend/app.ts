var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");

import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "./utils/swaggerSpec";

// Load route

var usersRouter = require("./routes/users");

var app = express();
const port = 9666;
app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/cryptohub/api", usersRouter);

app.use("/docs", serve, setup(swaggerSpec));
app.get("/docs.json", (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Every notificationPeriod time, fetch the data from the API and send the notifications
/*
const notificationPeriod = 1000 * 60 * 60; // 1 hour

setInterval(() => {

}, notificationPeriod);
*/

module.exports = app;

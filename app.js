var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var cron = require("node-cron");
var myCron = require("./app/subscription/controller/subscription.controller");
var authCron = require("./app/auth/controller/auth.controller");

var indexRouter = require("./routes/index");

var app = express();
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));


app.use("/", indexRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

require("./db");


cron.schedule("00 00 00 * * *", function () {
  myCron.paymentCron();
  authCron.updateTrial();
});

app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

// create server errors using http-errors
const createError = require("http-errors");
var cron = require('node-cron');

var myCron = require("./app/storyService/controller/storyController");

// import express framework
const express = require("express");
// swagger with node js for documentation
const swagger = require("swagger-node-express");
const cookieParser = require("cookie-parser");
// for set path of files
const path = require("path");
// set logs of api url with middlewares
const logger = require("morgan");
// cross origin set for frontend request get
const cors = require("cors");
// to create swagger ui with documentaion it is used
const swaggerUi = require("swagger-ui-express");
// set routing path in routing path
const indexRouter = require("./routes/index");
// set swagger routing in swagger.json file
const swaggerDocument = require("./swagger.json");
// import https for https file set
const https = require("https");
// import http for http file set
var http = require("http");
// set file system 
const fs = require("fs");
require("dotenv").config();
// create instance for framework
const app = express();

// set middlewares for of cross origins
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set logger for development 
app.use(logger("dev"));
// set file json set with express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set public url
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// set base router 
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//connect to mongoDB
require("./db");
// cron job for expire story delete

// cron.schedule('* * * * *', () => {
//   myCron.deleteStory();
// })


// Couple the application to the Swagger module.
// swagger.setAppHandler(app);
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
var port = process.env.PORT || "3011";

// create server using http/ https
var httpServer = http.createServer(app);
var io = require("socket.io")(httpServer);
/* io.sockets.on("connection", (socket) => {
  console.log("dere",socket)
}); */
require("./app/chatService/controller/chatController")(io);
httpServer.listen(port,(err, resp)=>{
  if(err) throw err;
  console.log(`app started on ${port}`);

});

// module.exports =app;



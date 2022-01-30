const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbURI = process.env.DB_URl;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(dbURI);
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ");
    throw err;
  });

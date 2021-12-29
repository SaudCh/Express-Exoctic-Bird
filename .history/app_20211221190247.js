const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./Models/http-error");
const BirdsRouter = require("./Routers/BirdsRouter");
const UserRouter = require("./Routers/userRouter");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/birds", BirdsRouter);
app.use("/user", UserRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//mongodb+srv://test:Test.1234@cluster0.l7gmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose
  .connect("mongodb://localhost:27017/exoticbirds")
  .then(() => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log("Error ", err);
  });

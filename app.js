const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRouter");

// 1- default function create server
const app = express();
const port = process.env.PORT || 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/ITISystem")
  .then(() => {
    console.log("DB Connected....");
    app.listen(port, () => {
      console.log("I'm listening ", port);
    });
  })
  .catch((error) => {
    console.log("DB Problem ..." + error);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);



app.use((req, res, next) => {
  res.status(404).json({ data: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ data: `Error MW ${err}` });
});

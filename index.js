const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
mongoose.connect();

app.get("/", (req, res) => {
  res.send({ message: "salam" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app is rinning on port ${port}`));

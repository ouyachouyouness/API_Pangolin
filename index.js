const express = require("express");
const mongoose = require("mongoose");

//import Routes
const userRoutes = require("./routes/users");

//config app
const app = express();
require("dotenv").config();

//db mongod db
mongoose
  .connect("mongodb://localhost/pangoline")

  .then(() => console.log("Data base connected"))
  .catch(() => console.log("Data base not connected"));

//Route Midlleware
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app is rinning on port ${port}`));

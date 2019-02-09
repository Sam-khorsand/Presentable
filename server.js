const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const records = require("./routes/records");
const scheduler = require("./apiCalls/scheduler");

const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.use(bodyParser.json());
app.use("/records", records);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port " + port));

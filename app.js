const express = require("express");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to our ETL app" });
});
module.exports = app;

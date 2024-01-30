const express = require("express");
const app = express();

app.use(express.json());

const tableRoute = require("./src/routes/tableRoute");
const gasRoute = require("./src/routes/gasRoute");

app.use("/tables", tableRoute);
app.use("/gas", gasRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to our ETL app" });
});
module.exports = app;

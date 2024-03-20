const express = require("express");
const app = express();

app.use(express.json());

const tableRoute = require("./src/routes/tableRoute");
const gasRoute = require("./src/routes/gasRoute");
const blockRoute = require("./src/routes/blockRoute");

app.use("/table", tableRoute);
app.use("/gas", gasRoute);
app.use("/block", blockRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to our ETL app" });
});
module.exports = app;

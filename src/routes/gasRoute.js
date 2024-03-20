const express = require("express");

const router = express.Router();

const { getAvgGasPrice } = require("../controllers/gasController");

router.get("/price", getAvgGasPrice);

module.exports = router;

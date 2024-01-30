const express = require("express");

const router = express.Router();

const {
  getAvgGasPrice,
  getTransactionsByBlock,
} = require("../controllers/gasController");

router.get("/price", getAvgGasPrice);
router.get("/block-transactions", getTransactionsByBlock);

module.exports = router;

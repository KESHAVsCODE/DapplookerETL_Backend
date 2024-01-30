const express = require("express");

const router = express.Router();

const {
  getAllBlockDetails,
  getTransactionsByBlock,
  getBlockDetails,
} = require("../controllers/blockController");

router.get("/", getAllBlockDetails);

router.get("/transactions", getTransactionsByBlock);

router.get("/:block_number", getBlockDetails);

module.exports = router;

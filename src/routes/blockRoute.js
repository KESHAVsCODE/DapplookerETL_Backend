const express = require("express");

const router = express.Router();

const {
  getAllBlockDetails,
  getTransactionsByBlock,
  getBlockDetails,
  transformBlockDetails,
} = require("../controllers/blockController");

router.get("/", getAllBlockDetails);

router.get("/transactions", getTransactionsByBlock);

router.get("/:block_number", getBlockDetails);

router.put("/transform", transformBlockDetails);

module.exports = router;

const express = require("express");

const router = express.Router();

const {
  getAllBlockDetails,
  getTransactionsByBlock,
} = require("../controllers/blockController");

router.get("/", getAllBlockDetails);
router.get("/transactions", getTransactionsByBlock);

module.exports = router;

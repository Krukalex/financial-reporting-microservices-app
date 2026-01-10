const express = require("express");
const {
  getTransactionTypeController,
  createTransactionTypeController,
  updateTransactionTypeController,
} = require("../controllers//transTypeController");

const router = express.Router();

router.get("/tx_type", getTransactionTypeController);

router.post("/tx_type/create", createTransactionTypeController);

router.put("/tx_type/update", updateTransactionTypeController);

module.exports = router;

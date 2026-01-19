const express = require("express");
const {
  getTransactionTypeController,
  createTransactionTypeController,
  updateTransactionTypeController,
  deleteTransactionTypeController,
} = require("../../controllers/reference/transTypeController");

const router = express.Router();

router.get("/", getTransactionTypeController);

router.post("/create", createTransactionTypeController);

router.put("/update", updateTransactionTypeController);

router.delete("/delete", deleteTransactionTypeController);

module.exports = router;

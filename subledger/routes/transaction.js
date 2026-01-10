const express = require("express");
const {
  getTransactionController,
  createTransactionController,
  deleteTransactionController,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getTransactionController);

router.post("/create", createTransactionController);

router.delete("/delete", deleteTransactionController);

module.exports = router;

const express = require("express");
const {
  getCurrencyController,
  createCurrencyController,
  updateCurrencyController,
  deleteCurrencyController,
} = require("../../controllers/reference/currencyController");

const router = express.Router();

router.get("/", getCurrencyController);

router.post("/create", createCurrencyController);

router.put("/update", updateCurrencyController);

router.delete("/delete", deleteCurrencyController);

module.exports = router;

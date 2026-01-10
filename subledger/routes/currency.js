const express = require("express");
const {
  getCurrencyController,
  createCurrencyController,
  updateCurrencyController,
  deleteCurrencyController,
} = require("../controllers/currencyController");

const router = express.Router();

router.get("/currency", getCurrencyController);

router.post("/currency/create", createCurrencyController);

router.put("/currency/update", updateCurrencyController);

router.delete("/currency/delete", deleteCurrencyController);

module.exports = router;

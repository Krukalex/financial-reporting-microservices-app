const express = require("express");
const {
  getFundController,
  createFundController,
  updateFundController,
  deleteFundController,
} = require("../../controllers/funds/fundControllers");

const router = express.Router();

router.get("/", getFundController);

router.post("/", createFundController);

router.put("/:fundId", updateFundController);

router.delete("/:fundId", deleteFundController);

module.exports = router;

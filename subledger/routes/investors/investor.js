const express = require("express");
const {
  getInvestorController,
  createInvestorController,
  updateInvestorController,
  deleteInvestorController,
} = require("../../controllers/investors/investorControllers");

const router = express.Router();

router.get("/", getInvestorController);

router.post("/", createInvestorController);

router.put("/:investorId", updateInvestorController);

router.delete("/:investorId", deleteInvestorController);

module.exports = router;

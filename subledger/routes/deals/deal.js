const express = require("express");
const {
  getDealController,
  createDealController,
  updateDealController,
  deleteDealController,
} = require("../../controllers/deals/dealControllers");

const router = express.Router();

router.get("/", getDealController);

router.post("/", createDealController);

router.put("/:dealId", updateDealController);

router.delete("/:dealId", deleteDealController);

module.exports = router;

const express = require("express");
const {
  getDealController,
  createDealController,
  updateDealController,
  deleteDealController,
} = require("../controllers/dealControllers");

const router = express.Router();

router.get("/deals", getDealController);

router.post("/deals/create", createDealController);

router.put("/deals/update", updateDealController);

router.delete("/deals/delete", deleteDealController);

module.exports = router;

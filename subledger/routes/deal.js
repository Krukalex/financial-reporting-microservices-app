const express = require("express");
const {
  getDealController,
  createDealController,
  updateDealController,
  deleteDealController,
} = require("../controllers/dealControllers");

const router = express.Router();

router.get("/", getDealController);

router.post("/create", createDealController);

router.put("/update", updateDealController);

router.delete("/delete", deleteDealController);

module.exports = router;

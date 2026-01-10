const express = require("express");
const {
  getFundController,
  createFundController,
  updateFundController,
} = require("../controllers/fundControllers");

const router = express.Router();

router.get("/funds", getFundController);

router.post("/funds/create", createFundController);

router.put("/funds/update", updateFundController);

module.exports = router;

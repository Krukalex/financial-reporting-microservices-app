const express = require("express");
const {
  getFundController,
  createFundController,
  updateFundController,
  deleteFundController,
} = require("../controllers/fundControllers");

const router = express.Router();

router.get("/funds", getFundController);

router.post("/funds/create", createFundController);

router.put("/funds/update", updateFundController);

router.delete("/funds/delete", deleteFundController);

module.exports = router;

const express = require("express");
const {
  getFundController,
  createFundController,
  updateFundController,
  deleteFundController,
} = require("../controllers/fundControllers");

const router = express.Router();

router.get("/", getFundController);

router.post("/create", createFundController);

router.put("/update", updateFundController);

router.delete("/delete", deleteFundController);

module.exports = router;

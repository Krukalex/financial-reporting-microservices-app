const express = require("express");
const {
  getFundCommitmentsController,
  createFundCommitmentsController,
} = require("../../controllers/funds/fundCommitmentControllers");

const router = express.Router();

router.get("/:fundId/commitments", getFundCommitmentsController);

router.post("/:fundId/commitments", createFundCommitmentsController);

module.exports = router;

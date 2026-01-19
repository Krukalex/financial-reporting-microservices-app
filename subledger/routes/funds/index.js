const express = require("express");

const fundRoutes = require("./fund");
const fundCommitmentRoutes = require("./fundCommitment");
// const fundEventRoutes = require("./fundEvent");

const router = express.Router();

router.use("/", fundRoutes);
router.use("/", fundCommitmentRoutes);
// router.use("/", fundEventRoutes);

module.exports = router;

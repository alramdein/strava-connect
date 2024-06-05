const express = require("express");
const accountRoutes = require("./accountRoutes");
const activityRoutes = require("./activityRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/accounts", accountRoutes);
router.use("/activities", activityRoutes);
router.use("/auth", authRoutes);

module.exports = router;

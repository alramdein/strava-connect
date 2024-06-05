const express = require("express");
const {
    getActivities,
    getActivity,
    addActivityToStrava,
} = require("../controllers/activityController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getActivities);
router.get("/:id", getActivity);

router.post("/", auth, addActivityToStrava);

module.exports = router;

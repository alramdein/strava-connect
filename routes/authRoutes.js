const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
    connectStrava,
    disconnectStrava,
} = require("../controllers/accountController");

// Strava OAuth redirect
router.get("/connect", (req, res) => {
    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.STRAVA_CALLBACK_URL}&scope=activity:read_all,activity:write`;
    res.redirect(stravaAuthUrl);
});

// Strava OAuth callback
router.get("/callback", connectStrava);

// Disconnect Strava account
router.post("/disconnect", auth, disconnectStrava);

module.exports = router;

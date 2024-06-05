const express = require("express");
const { auth } = require("../middleware/auth");
const {
    getAccounts,
    getAccount,
    getUserInfo,
} = require("../controllers/accountController");

const router = express.Router();

router.get("/", getAccounts);
// router.get("/:id", getAccount);
router.get("/me", auth, getUserInfo);

module.exports = router;

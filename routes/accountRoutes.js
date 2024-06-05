const express = require("express");
const { auth } = require("../middleware/auth");
const {
    getAccounts,
    getAccount,
    getUserInfo,
} = require("../controllers/accountController");

const router = express.Router();

router.get("/me", auth, getUserInfo);
router.get("/", getAccounts);
router.get("/:id", getAccount);

module.exports = router;

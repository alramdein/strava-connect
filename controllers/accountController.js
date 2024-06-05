const Account = require("../models/account");
const { addActivitiesToAccount } = require("../controllers/activityController");
const { fetchActivitiesFromStrava } = require("../services/stravaService");
const jwt = require("jsonwebtoken");

const getAccounts = async (req, res) => {
    const account = await Account.find();
    res.json(account);
};

const getAccount = async (req, res) => {
    const account = await Account.findById(req.params.id);
    res.json(account);
};

const createJwtToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

const getUserInfo = async (req, res) => {
    const user = req.user;
    res.json(user);
};

const connectStrava = async (req, res) => {
    const { code } = req.query;
    const { getStravaToken } = require("../services/stravaService");

    if (!code) {
        return res.status(400).json({ message: "Missing code parameter" });
    }

    try {
        const tokenData = await getStravaToken(code);

        let account = await Account.findOne({ stravaId: tokenData.athlete.id });
        if (!account) {
            account = new Account({
                stravaId: tokenData.athlete.id,
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
                displayName: tokenData.athlete.username,
            });
            await account.save();
        } else {
            account.accessToken = tokenData.access_token;
            account.refreshToken = tokenData.refresh_token;
            await account.save();
        }

        console.log(tokenData.access_token);

        const activities = await fetchActivitiesFromStrava(
            tokenData.access_token
        );
        await addActivitiesToAccount(account.stravaId, account.id, activities);

        const token = createJwtToken(account);
        res.redirect(`/home.html?token=${token}`);
    } catch (error) {
        console.error("Error connecting Strava:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const disconnectStrava = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        user.accessToken = null;
        user.refreshToken = null;
        await user.save();

        res.json({ message: "Disconnected from Strava" });
    } catch (error) {
        console.error("Error disconnecting Strava:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getAccounts,
    getAccount,
    getUserInfo,
    connectStrava,
    disconnectStrava,
};

const axios = require("axios");
const { getUnixTimestampDaysAgo } = require("../utils/time");

const getStravaToken = async (code) => {
    const response = await axios.post("https://www.strava.com/oauth/token", {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
    });
    return response.data;
};

async function fetchActivitiesFromStrava(accessToken) {
    const threeDaysAgo = getUnixTimestampDaysAgo(3);
    const response = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                after: threeDaysAgo,
            },
        }
    );
    return response.data;
}

const addActivityToStravaService = async (activity, accessToken) => {
    const response = await axios.post(
        "https://www.strava.com/api/v3/activities",
        activity,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};

module.exports = {
    getStravaToken,
    fetchActivitiesFromStrava,
    addActivityToStravaService,
};

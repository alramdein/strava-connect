const Activity = require("../models/activity");

const getActivities = async (req, res) => {
    const { stravaId } = req.query;

    try {
        const activities = await Activity.find({ stravaId });

        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: "Activities not found" });
        }

        res.json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getActivity = async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    res.json(activity);
};

const addActivityToStrava = async (req, res) => {
    try {
        const activity = req.body;
        const stravaAccessToken = req.user.stravaAccessToken;

        const stravaResponse = await addActivityToStravaService(
            activity,
            stravaAccessToken
        );

        const newActivity = new Activity({
            ...activity,
            start_date: new Date(activity.start_date),
        });
        await newActivity.save();

        res.json({ stravaResponse, newActivity });
    } catch (error) {
        console.error("Error adding activity:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

async function addActivitiesToAccount(athleteId, accountId, activities) {
    for (const activityData of activities) {
        const existingActivity = await Activity.findOne({
            stravaActivityId: activityData.id,
        });

        if (!existingActivity) {
            const newActivity = new Activity({
                accountId: accountId,
                stravaActivityId: activityData.id,
                athleteId: athleteId,
                name: activityData.name,
                distance: activityData.distance,
                movingTime: activityData.moving_time,
                elapsedTime: activityData.elapsed_time,
                totalElevationGain: activityData.total_elevation_gain,
                type: activityData.type,
                startDate: activityData.start_date,
                startDateLocal: activityData.start_date_local,
                timezone: activityData.timezone,
                utcOffset: activityData.utc_offset,
            });
            await newActivity.save();
        }
    }
}

module.exports = {
    getActivities,
    getActivity,
    addActivitiesToAccount,
    addActivityToStrava,
};

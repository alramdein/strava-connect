const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    stravaActivityId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    movingTime: {
        type: Number,
        required: true,
    },
    elapsedTime: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Activity", ActivitySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    stravaId: {
        type: String,
        required: true,
        unique: true,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    displayName: {
        type: String,
    },
});

module.exports = mongoose.model("Account", AccountSchema);

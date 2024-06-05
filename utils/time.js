const getUnixTimestampDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return Math.floor(date.getTime() / 1000);
};

const convertDate = (date) => {
    return startDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
};

module.exports = { getUnixTimestampDaysAgo, convertDate };

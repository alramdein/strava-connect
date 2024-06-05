require("dotenv").config();
require("./models/account");
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const config = require("config");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware setup
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
);

// Passport configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static("public"));

// Routes setup
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    )
    .catch((err) => console.error("Could not connect to MongoDB...", err));

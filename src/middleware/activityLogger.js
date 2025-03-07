const logToFile = require("../utils/logger");

const activityLogger = (req, res, next) => {
    const user = req.body ? req.body.email : "Guest";
    const logMessage = `METHOD: ${req.method} | URL: ${req.originalUrl} | User: ${user}`;
    
    logToFile(logMessage);
    next();
};

module.exports = activityLogger;

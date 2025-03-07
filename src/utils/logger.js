const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/activity.log");

const logToFile = (message) => {
    const logEntry = `[${new Date().toISOString()}] ${message}\n`;
    
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        }
    });
};

module.exports = logToFile;

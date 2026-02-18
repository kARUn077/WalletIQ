const mongoose = require('mongoose');

const db = async () => {
    console.log("DEBUG: db() function called");
    console.log("DEBUG: MONGO_URL length:", process.env.MONGO_URL ? process.env.MONGO_URL.length : "UNDEFINED");
    try {
        console.log("Attempting to connect to Database...");
        const dbConnection = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });
        console.log("Database successfully connected: Host ->", dbConnection.connection.host);
    }
    catch (e) {
        console.log("--------------------------------------------------");
        console.log("CRITICAL: Database not connect!");
        console.log("Reason:", e.message);
        console.log("Troubleshooting Tips:");
        console.log("1. Check if your IP is whitelisted in MongoDB Atlas (Network Access).");
        console.log("2. Ensure MONGO_URL in .env is correct.");
        console.log("3. Check your internet connection or firewall settings.");
        console.log("--------------------------------------------------");
    }
}

module.exports = { db };
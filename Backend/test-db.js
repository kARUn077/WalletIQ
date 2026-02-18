require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
    console.log('Attempting to connect to MongoDB...');
    console.log('URL:', process.env.MONGO_URL);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('SUCCESS: Connected to MongoDB successfully!');
        process.exit(0);
    } catch (error) {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error(error);
        process.exit(1);
    }
};

testConnection();

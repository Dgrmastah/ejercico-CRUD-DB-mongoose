const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error(error);
        throw new Error('Error starting database');
    }
};

module.exports = {
    dbConnection,
};
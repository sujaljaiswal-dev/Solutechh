const mongoose = require('mongoose');

/**
 * Connect to MongoDB Database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        // Use the modern connect signature. remove deprecated options `useNewUrlParser` and `useUnifiedTopology`.
        // Add sensible timeouts and prefer IPv4 family if needed.
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

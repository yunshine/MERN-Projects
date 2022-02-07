require('dotenv').config({ path: './config.env' });
const express = require("express");
const connectDB = require('./config/db');

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


const server = app.listen(PORT, () => {
    console.log(`testThis is the Empty App! You've created a server using Express.js. The server has started and is now listening on port ${PORT}...`);
});

process.on("unhandledRejection", (error, promise) => {
    console.log(`MongoDB database not connected: ${error}.`);
    server.close(() => process.exit(1));
});
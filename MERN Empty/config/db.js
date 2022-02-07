const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        // The options below are now deprecated in newer versions of Mongoose...
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
    });
};

console.log('Your "Empty MERN" app has successfully connected to the MongoDB database!');

module.exports = connectDB;

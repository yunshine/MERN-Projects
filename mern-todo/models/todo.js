// Mongoose/SCHEMA SETUP
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    // how to set a required value in the schema...
    todo: { type: String, required: true },
    // how to set a default value in the schema...
    note: { type: String, default: '' },
    isCompleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now() },
    // author: {
    //     id:
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User", // refers to the model we're referring to...
    //     },
    //     username: String,
    // },
});

// Creates the model from the schema that we've designated
// const Comment = mongoose.model('Comment', commentSchema);


// Creates and exports the model from the schema that we've designated
module.exports = mongoose.model('Todo', todoSchema);

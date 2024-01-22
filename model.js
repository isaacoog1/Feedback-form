const mongoose = require('mongoose');

//Define a schema for the collections in the database
const feedbackSchema = new mongoose.Schema({
    fullname: { type: String, required:true },
    email: { type: String, required: true },
    rating: { type: String, required: true },
    message: {type: String, required:true }
})

const Feedback = mongoose.model("Feedback", feedbackSchema)

module.exports = Feedback;
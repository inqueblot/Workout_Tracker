const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "please provide a type"
    },
    name: {
        type: String,
        trim: true,
        required: "please provide a name"
    },
    duration: {
        type: Number,
        required: "Please provide a duration"
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    },
    distance: {
        type: Number
    }
});



const Library = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
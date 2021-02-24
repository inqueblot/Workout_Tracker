const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercise: [
        {
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
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

{
    day: new Date().setDate(new Date().getDate() - 10),
        exercises: [
            {
                type: "resistance",
                name: "Bicep Curl",
                duration: 20,
                weight: 100,
                reps: 10,
                sets: 4
            }
        ]
},
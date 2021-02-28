const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/html-routes.js")(app);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});


app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
        });
})

app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .sort({ _id: -1 }).limit(7)
        .then(response => {

            res.json(response);
        })
        .catch(err => {
            console.log(err);
        });
})

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    let id = req.params.id
    db.Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } }, { new: true })
        .then(function (results) {
            res.json(results);
        })
        .catch(err => {
            console.log(err);
        });
})

app.post("/api/workouts", (req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
        .then(function (results) {
            res.json(results);
        })
        .catch(err => {
            console.log(err);
        });
})

app.get("/exercise", (req, res) => {

    db.Workout.find({ _id: (req.query.id) })
        .then(data => {

            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
})

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
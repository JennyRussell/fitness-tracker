const router = require('express').Router();
const Exercise = require('../models/exercise.js');


// posts a new workout
router.post('/exercises', (req, res) => {
  Exercise.create({})
    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.json(err);
    });
});


// gets the sum of exercise duration from workouts
router.get('/exercises', (req, res) => {
  Exercise.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then((dbExercises) => {
      res.json(dbExercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

// adds new exercises to current workout
router.put('/exercises/:id', ({ body, params }, res) => {
  Exercise.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.json(err);
    });
});



// gets the sum of exercise duration from all workouts
router.get('/exercises/range', (req, res) => {
  Exercise.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbExercises) => {
      console.log(dbExercises);
      res.json(dbExercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route deletes a workout
router.delete('/exercises', ({ body }, res) => {
  Exercise.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: 'Type of exercise',
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
      name: {
        type: String,
        trim: true,
        required: 'Name of exercise',
      },
      duration: {
        type: Number,
        required: 'Exercise duration (min)',
      },
      weight: {
        type: Number,
      },
      
    },
  ],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

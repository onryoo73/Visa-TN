const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [120, 'Name too long'],
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
      trim: true,
      maxlength: [600, 'Quote too long'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Review', ReviewSchema);

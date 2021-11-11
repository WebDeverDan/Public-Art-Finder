const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const artSchema = new Schema({
  title: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  artist: {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
      trim: true,
    },
  },
  location: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  addedBy: {
    type: String,
    required: false,
  },
  // addedBy:
  // {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const Art = model('Art', artSchema);

module.exports = Art;

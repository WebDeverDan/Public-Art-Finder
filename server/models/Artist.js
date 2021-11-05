const mongoose = require("mongoose");

const { Schema } = mongoose;

const artistSchema = new Schema({
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
  arts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;

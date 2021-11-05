const mongoose = require("mongoose");

const { Schema } = mongoose;

const userTypeSchema = new Schema({
  artist: {
    type: Boolean,
    required: true,
  },
});

const UserType = mongoose.model("UserType", userTypeSchema);

module.exports = UserType;

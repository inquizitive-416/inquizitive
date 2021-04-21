const { model, Schema, ObjectId } = require("mongoose");

const userSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  securityQuestion1: {
    type: String,
    required: true,
  },
  securityQuestion2: {
    type: String,
    required: true,
  },
  securityAnswer1: {
    type: String,
    required: true,
  },
  securityAnswer2: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  profilePublic: {
    type: Boolean,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
});

const User = model("User", userSchema);
module.exports = User;

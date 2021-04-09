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
  securityQuestionOne: {
    type: String,
    required: true,
  },
  securityQuestionTwo: {
    type: String,
    required: true,
  },
  securityAnswerOne: {
    type: String,
    required: true,
  },
  securityAnswerTwo: {
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

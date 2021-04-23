const { model, Schema, ObjectId } = require("mongoose");
const userSchema = new Schema({
  _id: {
    type: ObjectId,
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
    required: false,
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
    required: false,
  },
  profilePublic: {
    type: Boolean,
    required: false,
  },
  coins: {
    type: Number,
    required: false,
  },
});
const User = model("User", userSchema);
module.exports = User;
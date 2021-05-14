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
  bannerPicture: {
    type: String,
    required: false,
  },
  bgColor: {
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
  facebookLink: {
    type: String,
    required: false,
  },
  twitterLink: {
    type: String,
    required: false,
  },
  youtubeLink: {
    type: String,
    required: false,
  },
  instagramLink: {
    type: String,
    required: false,
  },
  customLink: {
    type: String,
    required: false,
  },
  verified: {
    type: String,
    required: false,
  },
});
const User = model("User", userSchema);
module.exports = User;
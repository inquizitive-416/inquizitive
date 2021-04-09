const { model, Schema, ObjectId } = require("mongoose");

const quizSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  quizId: {
    type: Number,
    required: true,
  },
  idOfCreator: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  categories: {
    type: [
      {
        category: {
          type: String,
        },
      },
    ],
    required: true,
  },
  hashtags: {
    type: [
      {
        hashtags: {
          type: String,
        },
      },
    ],
    required: true,
  },
  timer: {
    type: Number,
    required: true,
  },
  questions: {
    type: [
      {
        questionId: {
          type: Number,
        },
        questionNumber: {
          type: Number,
        },
        questionType: {
          type: String,
        },
      },
    ],
    required: true,
  },
  quizPosted: {
    type: Boolean,
    required: true,
  },
  ratings: {
    type: [
      {
        userId: {
          type: Number,
        },
        rating: {
          type: Number,
        },
      },
    ],
    required: true,
  },
  averageRating: {
    type: Number,
    required: true,
  },
  numOfTimesPlayed: {
    type: Number,
    required: true,
  },
  isReported: {
    type: Boolean,
    required: true,
  },
});

const Quiz = model("Quiz", quizSchema);
module.exports = Quiz;

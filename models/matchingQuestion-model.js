const { model, Schema, ObjectId } = require("mongoose");

const matchingQuestionSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  questionId: {
    type: Number,
    required: true,
  },
  promptString: {
    type: String,
    required: true,
  },
  leftSideMatch: {
    type: [
      {
        pairId: {
          type: Number,
        },
        placeInOrder: {
          type: Number,
        },
        pairText: {
          type: String,
        },
        pairImage: {
          type: String,
        },
      },
    ],
    required: true,
  },
  rightSideMatch: {
    type: [
      {
        pairId: {
          type: Number,
        },
        placeInOrder: {
          type: Number,
        },
        pairText: {
          type: String,
        },
        pairImage: {
          type: String,
        },
      },
    ],
    required: true,
  },
});

const MatchingQuestion = model("MatchingQuestion", matchingQuestionSchema);
module.exports = MatchingQuestion;

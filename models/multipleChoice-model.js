const { model, Schema, ObjectId } = require("mongoose");

const multipleChoiceSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  questionId: {
    type: Number,
    required: true,
  },
  questionString: {
    type: String,
    required: true,
  },
  choice: {
    type: [
      {
        answer: {
          type: String,
        },
        correctChoice: {
          type: Boolean,
        },
      },
    ],
    required: true,
  },
});

const MultipleChoice = model("MultipleChoice", multipleChoiceSchema);
module.exports = MultipleChoice;

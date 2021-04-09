const { model, Schema, ObjectId } = require("mongoose");

const fillInTheBlankSchema = new Schema({
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
  correctAnswer: {
    type: String,
    required: true,
  },
});

const FillInTheBlank = model("FillInTheBlank", fillInTheBlankSchema);
module.exports = FillInTheBlank;

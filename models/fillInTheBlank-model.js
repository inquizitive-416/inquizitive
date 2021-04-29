const { model, Schema, ObjectId } = require("mongoose");

const fillInTheBlankSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  questionPrompt: {
    type: String,
    required: true,
  },
  correctChoice: {
    type: String,
    required: true,
  },
});

const FillInTheBlank = model("FillInTheBlank", fillInTheBlankSchema);
module.exports = FillInTheBlank;

const { model, Schema, ObjectId } = require("mongoose");

const questionSchema = new Schema({
  id: {
    type: Number,
    
  },
  questype:
  {
      type: String
  },
  questionPrompt: {
    type: String, 
  },
  choice1: {
    type: String,
    
  },
  choice2: {
    type: String,
  },
 
  choice3: {
    type: String,  
  },

  choice4: {
    type: String,
  },

  image1: {
    type: String,
  },

  image2: {
    type: String,
  },
  
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },

  correctAnswer: {
    type: String,
  },
});

const Question = model("Question", questionSchema);
module.exports = Question;

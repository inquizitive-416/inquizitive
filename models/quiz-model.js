const { model, Schema, ObjectId } = require("mongoose");
const Question = require('./question-model').schema;

const quizSchema = new Schema({
  _id: {
    type: ObjectId,
    
  },
  idOfCreator: {
    type: String,
    
  },
  title: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  coverimage: {
    type: String,
    
  },
 
  categories: {
    type: String,
    
  },
  hashtagone: {
    type: String,
    
  },
  hashtagtwo: {
    type: String,
    
  },
  hashtagthree: {
    type: String,
    
  },
  difficulty: {
    type: String,
    
  },
  quizposted: {
    type: Boolean,
   
  },
  timer: {
    type: Number,
   
  },
  questions: [Question],

  ratings: {
    type: Number,
    
  },
  avgRating: {
    type: Number,
    
  },
  numOfTimesPlayed: {
    type: Number,
   
  },
  isReported: {
    type: Boolean,
    
  },
});

const Quiz = model("Quiz", quizSchema);
module.exports = Quiz;

const { model, Schema, ObjectId } = require("mongoose");

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
  // categories: {
  //   type: [
  //     {
  //       category: {
  //         type: String,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
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
  questions: {
      type: [
        {
          category: {
            type: String,
          },
        },
      ],
      
    },

  // questions: {
  //   type: [
  //     {
  //       questionId: {
  //         type: Number,
  //       },
  //       questionNumber: {
  //         type: Number,
  //       },
  //       questionType: {
  //         type: String,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
  // categories: {
  //   type: [
  //     {
  //       category: {
  //         type: String,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
  // hashtagone: {
  //   type: String,
  //   required: true,
  // },
  // ratings: {
  //   type: [
  //     {
  //       userId: {
  //         type: Number,
  //       },
  //       rating: {
  //         type: Number,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
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

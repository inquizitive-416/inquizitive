const ObjectId = require("mongoose").Types.ObjectId;
const Quiz = require("../models/quiz-model");

module.exports = {
   Query: {
    /**
			getQuizById,
		**/

    /**
		 	@param 	 {object} args - a quiz id
			@returns {object} a quiz on success and an empty object on failure
		**/
    getQuizById: async (_, args) => {
      const { _id } = args;
      const objectId = new ObjectId(_id);
      const quiz = await Quiz.findOne({ _id: objectId });
      if (quiz) {
        // console.log(quiz);
        return quiz;
      }
      else return {};
    },
  getQuizzesByRating: async (_, args) => {
    const quiz = await Quiz.find().limit(3).sort({ avgRating: -1 });
    if (quiz) return quiz;
    else return {};
  },
  getAllQuizzesFromCreator: async (_, args) => {
    const { idOfCreator } = args;
    const quizzes = await Quiz.find({ idOfCreator: idOfCreator });
    if (quizzes) return quizzes;
    else return {};
  },
  getPaginizedQuizzesByAge: async (_, args) => {
    const { idOfCreator, skip, limit } = args;
    const quizzes = await Quiz.find({ idOfCreator: idOfCreator })
                              .sort({ _id: -1 })
                              .skip(skip)
                              .limit(limit);
    if (quizzes) return quizzes;
    else return {};
  },
  searchByCategory: async (_, args) => {
    const { categories, skip, limit} = args;
    const quizzes = await Quiz.find({ categories: {$regex: categories, $options: 'i'} }).sort({ _id: -1 }).skip(skip).limit(limit);
    if (quizzes)
      return quizzes;
    else return {};
  },
    searchByHashtag: async (_, args) => {
      const { hashtag, skip, limit} = args;
      const quizzes = await Quiz.find( {hashtagone: hashtag }).sort({ _id: -1 }).skip(skip).limit(limit);
      if (quizzes)
        return quizzes;
      else return {};
    },

    getSearchedCategoryCount: async (_, args) => {
      const { categories } = args;
      const quizzes = await Quiz.find({ categories: {$regex: categories, $options: 'i'} });
      if (quizzes)
        return quizzes;
      else return {};
    },

    filterByDifficulty: async (_, args) => {
      const { difficulty, skip, limit } = args;
      const quizzes = await Quiz.find( {difficulty: difficulty }).sort({ _id: -1 }).skip(skip).limit(limit);
      if (quizzes)
        return quizzes;
      else return {};
    },

    getAllQuizzesCount: async (_, args) => {
      const { skip, limit } = args;
      const users = await Quiz.find().sort({ _id: -1 });
      if (users) return users;
      else return {};
    },

   },

    Mutation: {
      /**
			addQuiz,
			deleteQuiz,
			updateQuizField,
      getAllReportedQuizzes
		**/

      /**
		 	@param 	 {object} args - an empty quiz object
			@returns {string} the objectID of the new quiz, or an error message
		**/
      addQuiz: async (_, args,  { res }) => {
        //const { quiz } = args;
        const objectId = new ObjectId();
        const {
          idOfCreator,
          title,
          description,
          coverimage,
          categories,
          hashtagone,
          hashtagtwo,
          hashtagthree,
          difficulty,
          quizposted,
          timer,
          questions,
          ratings,
          avgRating,
          numOfTimesPlayed,
          isReported
        } = args;

        for (const [index, value] of questions.entries()) {
          value._id=new ObjectId();
        } 
        
        const newQuiz = new Quiz({
          _id: objectId,
          idOfCreator: idOfCreator,
          title: title,
          description: description,
          coverimage: coverimage,
          categories: categories,
          hashtagone:hashtagone,
          hashtagtwo:hashtagtwo,
          hashtagthree:hashtagthree,
          difficulty:difficulty,
          quizposted: quizposted,
          timer: timer,
          questions: questions,
          ratings: ratings,
          avgRating: avgRating,
          numOfTimesPlayed: numOfTimesPlayed,
          isReported: isReported
        });
        const updated = await newQuiz.save();
        if (updated) return objectId;
        else return "Could not add quiz";
      },

      
	
      UpdateQuiz: async (_, args) => {
        let { _id, idOfCreator, title, description, coverimage, categories, hashtagone, hashtagtwo, hashtagthree, difficulty, quizposted, timer, questions, ratings, avgRating, numOfTimesPlayed, isReported} = args;
         
        const objectId = new ObjectId(_id);
        for (const [index, value] of questions.entries()) {
          value._id=new ObjectId();
        } 
        console.log("updated ques", questions);
        const saved = await Quiz.updateOne({ _id: objectId }, {
            idOfCreator: idOfCreator, title: title,  description: description, coverimage: coverimage, categories: categories, hashtagone: hashtagone, hashtagtwo:hashtagtwo,hashtagthree:hashtagthree,
            difficulty: difficulty, quizposted: quizposted, timer:timer, questions:questions, ratings: ratings, avgRating:avgRating, numOfTimesPlayed:numOfTimesPlayed, isReported: isReported
        })
        if (saved) return objectId;
        else return null;
    },
    updateRating: async (_, args) => {
      let { _id, avgRating , numOfTimesPlayed} = args;
      console.log(numOfTimesPlayed)
      const objectId = new ObjectId(_id);
      let saved = await Quiz.updateOne({ _id: objectId }, { avgRating: avgRating, numOfTimesPlayed: numOfTimesPlayed});
      if (saved) return true;
      else return false;
  },
  
      /**
		 	@param 	 {object} args - a quiz objectID
			@returns {boolean} true on successful delete, false on failure
		**/
      deleteQuiz: async (_, args) => {
        const { _id } = args;
        const objectId = new ObjectId(_id);
        const deleted = await Quiz.deleteOne({ _id: objectId });
        if (deleted) return true;
        else return false;
      },

    },



    
  }

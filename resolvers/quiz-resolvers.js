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
  getPaginizedQuizzesByAge: async (_, args) => {
    const { idOfCreator, skip, limit } = args;
    const quizzes = await Quiz.find({ idOfCreator: idOfCreator })
                              .sort({ _id: -1 })
                              .skip(skip)
                              .limit(limit);
    if (quizzes) return quizzes;
    else return {};
  },
      getSearchedQuizzes: async (_, args) => {
        const { categories, skip, limit} = args;
        const quizzes = await Quiz.find({ categories: categories }).sort({ _id: -1 }).skip(skip).limit(limit);
        if (quizzes) return quizzes;
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
      /**
		 	@param 	 {object} args - a quiz objectID, field (title, description, etc), and the update value
			@returns {boolean} true on successful update, false on failure
		**/
      updateQuizField: async (_, args) => {
        const { field, value, _id } = args;
        const objectId = new ObjectId(_id);
        const updated = await Quiz.updateOne(
          { _id: objectId },
          { [field]: value }
        );
        if (updated) return true;
        else return false;
      },

  
      /**
            @return {array} - return array of reported Quizzes
        **/
      // getAllReportedQuizzes: async (_, __) => {
      //   const reportedQuizzes = await Quiz.find({ isReported: True });
      //   if (reportedQuizzes) return reportedQuizzes;
      // },
    },
  }

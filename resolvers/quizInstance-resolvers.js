const ObjectId = require('mongoose').Types.ObjectId;
const quizInstance = require('../models/quizInstance-model');
module.exports = {
    Query:{
        getquizInstanceById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const QuizInstance = await quizInstance.findOne({_id: objectId});
			if(QuizInstance) return QuizInstance;
			else return ({});
        }
    },
    Mutation: {
        addQuizInstance: async (_, args) => {
			const { QuizInstance } = args;
			let { objectId, id, uid, fin, score, time, lastAccessed, questions } = QuizInstance;
			const newQuizInstance = new quizInstance({
				_id: objectId,
                quizId: id,
				userId: uid,
                finished: fin,
                score: score,
                timeRemaining: time,
                lastAccessed: lastAccessed,
                questions: questions
			});
			const updated = await newQuizInstance.save();
			if(updated) return objectId;
			else return ('Could not add newQuizInstance');
		},
        updateQuizInstance: async (_, args) => {
			const { QuizInstance } = args;
			let { objectId, id, uid, fin, score, time, lastAccessed, questions} = QuizInstance;
			const saved = await quizInstance.updateOne({ _id: objectId },{
				_id: objectId,
                quizId: id,
				userId: uid,
                finished: fin,
                score: score,
                timeRemaining: time,
                lastAccessed: lastAccessed,
                questions: questions
			});
			if(saved) return true;
			else return false;
		},
        deleteQuizInstance: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await quizInstance.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        }
    }
    
}
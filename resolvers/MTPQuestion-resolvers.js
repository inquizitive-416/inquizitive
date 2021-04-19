const ObjectId = require('mongoose').Types.ObjectId;
const MTPQuestion = require('../models/matchingQuestion-model');
module.exports = {
    Query:{
        getMTPQuestionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const mtpques = await MTPQuestion.findOne({_id: objectId});
			if(mtpques) return mtpques;
			else return ({});
		},
    },
    Mutation: {
        addMTPQuestion: async (_, args) => {
			const { MTPQuestion } = args;
			const objectId = new ObjectId();
			let { questionId, promptString,leftSideMatch,rightSideMatch } = MTPQuestion;
			const newMTP = new MTPQuestion({
				_id: objectId,
				questionId: questionId,
				promptString: promptString,
                leftSideMatch: leftSideMatch,
                rightSideMatch:rightSideMatch
			});
			const updated = await newMTP.save();
			if(updated) return objectId;
			else return ('Could not add MTP question');
		},
        updateMTPQuestion: async (_, args) => {
			const { MTPQuestion } = args;
			const objectId = new ObjectId();
			let { questionId, promptString,leftSideMatch,rightSideMatch } = MTPQuestion;
			const saved = await MTPQuestion.updateOne({ _id: objectId },{
				_id: objectId,
				questionId: questionId,
				promptString: promptString,
                leftSideMatch: leftSideMatch,
                rightSideMatch:rightSideMatch
			});
			if(saved) return True;
			else return False;
		},
        deleteMTPQuestion: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await MTPQuestion.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        }
  
	}
}  
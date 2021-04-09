const ObjectId = require('mongoose').Types.ObjectId;
const MCQInstance = require('../models/mcqInstance-model');
module.exports = {
    Query:{
        getMCQInstanceById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const mcqInstance = await MCQInstance.findOne({_id: objectId});
			if(mcqInstance) return mcqInstance;
			else return ({});
        }
    },
    Mutation: {
        addMCQInstance: async (_, args) => {
			const { MCQInstance } = args;
			const objectId = new ObjectId();
			let { id, qid, userAns } = MCQInstance;
			const newMCQInstance = new MCQInstance({
				_id: objectId,
				id: id,
                quizId: qid,
				userChoice: userAns
			});
			const updated = await newMCQInstance.save();
			if(updated) return objectId;
			else return ('Could not add newMCQInstance');
		},
        updateMCQInstance: async (_, args) => {
			const { MCQInstance } = args;
			
			let { objectId, id, qid, userAns } = MCQInstance;
			const saved = await MCQInstance.updateOne({ _id: objectId },{
				_id: objectId,
				id: id,
                quizId: qid,
				userChoice: userAns
			});
			if(saved) return true;
			else return false;
		},
        deleteMCQInstance: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await MCQInstance.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        }
    }
    
}
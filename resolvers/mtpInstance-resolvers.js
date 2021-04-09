const ObjectId = require('mongoose').Types.ObjectId;
const MTPInstance = require('../models/mtpInstance-model');
module.exports = {
    Query:{
        getMTPInstanceById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const mtpInstance = await MTPInstance.findOne({_id: objectId});
			if(mtpInstance) return mtpInstance;
			else return ({});
        }
    },
    Mutation: {
        addMTPInstance: async (_, args) => {
			const { MTPInstance } = args;
			const objectId = new ObjectId();
			let { qid, id, userMatch } = MTPInstance;
			const newMTP = new MTPInstance({
				_id: objectId,
				quizId: qid,
                questionId: id,
				userMatch: userMatch
			});
			const updated = await newMTP.save();
			if(updated) return objectId;
			else return ('Could not add todolist');
		},
        updateMTPInstance: async (_, args) => {
			const { MTPInstance } = args;
			let { objectId, qid, id, userMatch } = MTPInstance;
			const saved = await MTPInstance.updateOne({ _id: objectId },{
				_id: objectId,
                quizId: qid,
				id: id,
				userMatch: userMatch
			});
			if(saved) return true;
			else return false;
		},
        deleteMTPInstance: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await MTPInstance.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        }
    }
    
}
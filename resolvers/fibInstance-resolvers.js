const ObjectId = require('mongoose').Types.ObjectId;
const FIBInstance = require('../models/fibInstance-model');
module.exports = {
    Query:{
        getFIBInstanceById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const fibInstance = await FIBInstance.findOne({_id: objectId});
			if(fibInstance) return fibInstance;
			else return ({});
        }
    },
    Mutation: {
        addFIBInstance: async (_, args) => {
			const { FIBInstance } = args;
			const objectId = new ObjectId();
			let { id, qid, userAns } = FIBInstance;
			const newFIBInstance = new FIBInstance({
				_id: objectId,
				id: id,
                quizId: qid,
				answer: userAns
			});
			const updated = await newFIBInstance.save();
			if(updated) return objectId;
			else return ('Could not add newFIBInstance');
		},
        updateFIBInstance: async (_, args) => {
			const { FIBInstance } = args;
			let { objectId, id, qid, userAns } = FIBInstance;
			const saved = await FIBInstance.updateOne({ _id: objectId },{
				_id: objectId,
				id: id,
                quizId: qid,
				answer: userAns
			});
			if(saved) return true;
			else return false;
		},
        deleteFIBInstance: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await FIBInstance.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        }
    }
    
}

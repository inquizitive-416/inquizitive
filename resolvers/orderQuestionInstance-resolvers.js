const ObjectId = require("mongoose").Types.ObjectId;
const orderQuestionInstance = require("../models/orderQuestionInstance-model");

module.exports = {
    Query: {

        /**
           @param 	 {object} args - a orderQuestion id
			@returns {object} a orderQuestionInstance on success and an empty object on failure
        **/
        getOrderQuestionInstanceById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const orderQuestions = await orderQuestions.findOne({_id: objectId});
			if(orderQuestions) return orderQuestions;
			else return ({});
		},
    },

    Mutation: {
        /**
            @param {object} args - an empty orderQuestionInstance object
            @returns {string} the objectId of the orderQuestionInstance or an error message
        **/
        addOrderQuestionInstance: async (_, args) => {
            const { orderQuestionInstance } = args;
            const objectId = new ObjectId();
            let { questionId, cards} = orderQuestion;
            const newOrderQuestionInstance = new orderQuestionInstance({
                _id: objectId,
                questionId: questionId,
                cards: cards
                
            })

            const saved = await newOrderQuestionInstance.save();
            if (saved) return objectId;
            else return ("Couldn't add order Question");
        },

        deleteAllOrderQuestionInstance: async () => {
            const deleted = await orderQuestionInstance.deleteMany({});
            console.log(deleted);
            if (deleted) return true;
            else return false;
        },

        /**
            @param {object} args - an orderQuestionInstanceorder question instance object
            @returns {boolean} - successful delete: true, failure: false
        **/
        deleteOrderQuestionInstance: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await orderQuestionInstance.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        },

        /**
            @param {object} args - a orderQuestionInstance objectID, an array od cards
            @returns {boolean} successful update: true, failure: false
         **/
        updateOrderQuestionInstance: async (_, args) => {
            let { questionId, cards} = args;
            const objectId = new ObjectId(_id);

            const saved = await orderQuestionInstance.updateOne({ _id: objectId }, {
                questionId:questionId, cards: cards,
            })
            if (saved) return true;
            else return false;
        }
    }
}
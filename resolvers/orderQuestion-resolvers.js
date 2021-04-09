const ObjectId = require("mongoose").Types.ObjectId;
const orderQuestion = require("../models/orderQuestion");

module.exports = {
    Query: {

        /**
           @param 	 {object} args - a orderQuestion id
			@returns {object} a orderQuestion on success and an empty object on failure
        **/
        getOrderQuestionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const orderQuestions = await orderQuestions.findOne({_id: objectId});
			if(orderQuestions) return orderQuestions;
			else return ({});
		},
    },

    Mutation: {
        /**
            @param {object} args - an empty orderQuestion object
            @returns {string} the objectId of the orderQuestion or an error message
        **/
        addOrderQuestion: async (_, args) => {
            const { orderQuestion } = args;
            const objectId = new ObjectId();
            let { questionId, promptString, cards} = orderQuestion;
            const newOrderQuestion = new orderQuestion({
                _id: objectId,
                questionId: questionId,
                promptString:promptString,
                cards: cards
                
            })

            const saved = await newOrderQuestion.save();
            if (saved) return objectId;
            else return ("Couldn't add order Question");
        },

        deleteAllOrderQuestion: async () => {
            const deleted = await orderQuestion.deleteMany({});
            console.log(deleted);
            if (deleted) return true;
            else return false;
        },

        /**
            @param {object} args - an orderQuestion object
            @returns {boolean} - successful delete: true, failure: false
        **/
        deleteOrderQuestion: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await orderQuestion.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        },

        /**
            @param {object} args - a orderQuestion objectID, a prompt string, and cards
            @returns {boolean} successful update: true, failure: false
         **/
        updateOrderQuestion: async (_, args) => {
            let { questionId, promptString, cards} = args;
            const objectId = new ObjectId(_id);

            const saved = await orderQuestionInstance.updateOne({ _id: objectId }, {
                questionId:questionId, promptString:promptString, cards: cards,
            })
            if (saved) return true;
            else return false;
        }
    }
}
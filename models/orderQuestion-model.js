const { model, Schema, ObjectId } = require('mongoose');

const orderQuestionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		questionId: {
			type: Number,
			required: true
		},
        cards:[{
            cardId:{
                type:Number,
                required: true
            },
            userSelectedOrder:{
                type:Number,
                required: true
        }
     }]

	}
);

const orderQuestion = model('orderQuestion', orderQuestionSchema);
module.exports = orderQuestion;
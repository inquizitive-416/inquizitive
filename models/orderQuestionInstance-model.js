const { model, Schema, ObjectId } = require('mongoose');

const orderQuestionInstanceSchema = new Schema(
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

const orderQuestionInstance = model('orderQuestionInstance', orderQuestionInstanceSchema);
module.exports = orderQuestionInstance;
const { model, Schema, ObjectId } = require('mongoose');
const mtpInstanceSchema = new Schema({
    _id:{
		type: ObjectId,
		required: true
	},
    quizId:{
        type: Number,
        required: true
    },
    questionId:{
        type: Number,
        required: true
    },
    userMatch:[{
        pairId:{
            type: Number,
            required: true
        },
        selectedOrder:{
            type: Number,
            required: true
        }   
    }]
});
const mtpInstance = model('mtpInstance', mtpInstanceSchema);
module.exports = mtpInstance;
const { model, Schema, ObjectId } = require('mongoose');
const fibInstanceSchema = new Schema({
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
    answer:{
        type: String,
        required: true
    }
});
const fibInstance = model('fibInstance', fibInstanceSchema);
module.exports = fibInstance;
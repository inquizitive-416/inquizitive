const { model, Schema, ObjectId } = require('mongoose');
const mcqInstanceSchema = new Schema({
    _id:{
		type: ObjectId,
		required: true
	},
    id:{
        type: Number,
        required: true
    },
    quizId:{
        type: Number,
        required: true
    },
    userChoice:{
        type: String,
        required: true
    }
});
const mcqInstance = model('mcqInstance', mcqInstanceSchema);
module.exports = mcqInstance;
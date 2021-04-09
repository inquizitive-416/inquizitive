const { model, Schema, ObjectId } = require('mongoose');
const mcqInstanceSchema = new Schema({
    _id:{
		type: ObjectId,
		required: true
	},
    id:{
        type:Number,
        required:True
    },
    quizId:{
        type:Number,
        required:True
    },
    userChoice:{
        type:String,
        required:true
    }
});
const mcqInstance = model('mcqInstance', mcqInstanceSchema);
module.exports = mcqInstance;
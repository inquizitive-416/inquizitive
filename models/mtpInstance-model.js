const { model, Schema, ObjectId } = require('mongoose');
const mtpInstanceSchema = new Schema({
    _id:{
		type: ObjectId,
		required: true
	},
    quizId:{
        type:Number,
        required:True
    },
    questionId:{
        type:Number,
        required:True
    },
    userMatch:[{
        pairId:{
            type:Number,
            required:true
        },
        selectedOrder:{
            type:Number,
            required:True
        }   
    }]
});
const mtpInstance = model('mtpInstance', mtpInstanceSchema);
module.exports = mtpInstance;
const { model, Schema, ObjectId } = require('mongoose');
const quizInstanceSchema = new Schema(
    {
        _id: {
			type: ObjectId,
			required: true
		},
        quizId:{
            type:Number,
            required:True
        },
        userId:{
            type:Number,
            required:True
        },
        finished:{
            type:Boolean,
            required:True
        },
        score:{
            type:Number,
            required:True
        },
        timeRemaining:{
            type:Number,
            required:True
        },
        lastAccessed:{
            type:Date,
            required: True
        },
        questions:[{
            questionId:{
                type:Number,
                required:True
            },
            questionType:{
                type:String,
                required:True
            }
        }]
    }
);
const quizInstance = model('quizInstance', quizInstanceSchema);
module.exports = quizInstance;
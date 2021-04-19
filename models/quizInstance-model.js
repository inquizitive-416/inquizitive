const { model, Schema, ObjectId } = require('mongoose');
const quizInstanceSchema = new Schema(
    {
        _id: {
			type: ObjectId,
			required: true,
		},
        quizId:{
            type: Number,
            required: true,
        },
        userId:{
            type: Number,
            required: true,
        },
        finished:{
            type: Boolean,
            required: true,
        },
        score:{
            type: Number,
            required: true,
        },
        timeRemaining:{
            type: Number,
            required: true,
        },
        lastAccessed:{
            type: Date,
            required: true,
        },
        questions:[{
            questionId:{
                type: Number,
                required: true,
            },
            questionType:{
                type: String,
                required: true,
            }
        }]
    }
);
const quizInstance = model('quizInstance', quizInstanceSchema);
module.exports = quizInstance;
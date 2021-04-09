const { model, Schema, ObjectId } = require('mongoose');

const tournamentSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		tournamentId: {
			type: Number,
			required: true
		},
		idOfCreator: {
			type: Number,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
        startDate: {
			type: Date,
			required: true
		},
        endDate: {
			type: Date,
			required: true
		},
        quizzesInTournament:[{
         quizId:{
            type:Number,
             required: true
        }   
     }],
      posted: {
			type: Boolean,
			required: true
		}

	}
);

const tournament = model('Tournament', tournamentSchema);
module.exports = Tournament;
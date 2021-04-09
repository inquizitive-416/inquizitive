const { model, Schema, ObjectId } = require('mongoose');

const activeTournamentSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		tournamentid: {
			type: Number,
			required: true
		},
		userid: {
			type: Number,
			required: true
		},
		finished: {
			type: Boolean,
			required: true
		},
		lastaccessed: {
			type: Date,
			required: true
		},
        quizzes:[{
         activequizid:{
            type:Number,
             required: true
        },
        completed:
         {
          type:Boolean,
          required: True
        }
  }]
	}
);

const activeTournament = model('activeTournament', activeTournamentSchema);
module.exports = activeTournament;
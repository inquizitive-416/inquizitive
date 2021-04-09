const ObjectId = require("mongoose").Types.ObjectId;
const FillInTheBlank = require("../models/fillInTheBlank-model");

module.exports = {
  Query: {
    /**
			getFillInTheBlankById
		**/

    /**
		 	@param 	 {object} args - a FillInTheBlank id
			@returns {object} a FillInTheBlank on success and an empty object on failure
		**/
    getFillInTheBlankById: async (_, args) => {
      const { _id } = args;
      const objectId = new ObjectId(_id);
      const fillInTheBlank = await FillInTheBlank.findOne({ _id: objectId });
      if (fillInTheBlank) return fillInTheBlank;
      else return {};
    },

    Mutation: {
      /**
			addFillInTheBlank,
			deleteFillInTheBlank,
			updateFillInTheBlankField
		**/

      /**
		 	@param 	 {object} args - an empty FillInTheBlank object
			@returns {string} the objectID of the new FillInTheBlank, or an error message
		**/
      addFillInTheBlank: async (_, args) => {
        const { fillInTheBlank } = args;
        const objectId = new ObjectId();
        const { questionId, questionString, correctAnswer } = fillInTheBlank;
        const newFillInTheBlank = new FillInTheBlank({
          _id: objectId,
          questionId: questionId,
          questionString: questionString,
          correctAnswer: correctAnswer,
        });
        const updated = await newFillInTheBlank.save();
        if (updated) return objectId;
        else return "Could not add fillInTheBlank";
      },
      /**
		 	@param 	 {object} args - a FillInTheBlank objectID
			@returns {boolean} true on successful delete, false on failure
		**/
      deleteFillInTheBlank: async (_, args) => {
        const { _id } = args;
        const objectId = new ObjectId(_id);
        const deleted = await FillInTheBlank.deleteOne({ _id: objectId });
        if (deleted) return true;
        else return false;
      },
      /**
		 	@param 	 {object} args - a FillInTheBlank objectID, field (questionId, questionString, etc), and the update value
			@returns {boolean} true on successful update, false on failure
		**/
      updateFillInTheBlankField: async (_, args) => {
        const { field, value, _id } = args;
        const objectId = new ObjectId(_id);
        const updated = await FillInTheBlank.updateOne(
          { _id: objectId },
          { [field]: value }
        );
        if (updated) return true;
        else return false;
      },
    },
  },
};

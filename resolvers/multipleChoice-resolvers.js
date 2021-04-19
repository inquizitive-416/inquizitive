const ObjectId = require("mongoose").Types.ObjectId;
const MultipleChoice = require("../models/multipleChoice-model");

module.exports = {
  Query: {
    /**
			getMultipleChoiceById
		**/

    /**
		 	@param 	 {object} args - a MultipleChoice id
			@returns {object} a MultipleChoice on success and an empty object on failure
		**/
    getMultipleChoiceById: async (_, args) => {
      const { _id } = args;
      const objectId = new ObjectId(_id);
      const multipleChoice = await MultipleChoice.findOne({ _id: objectId });
      if (multipleChoice) return multipleChoice;
      else return {};
    },
  },

  Mutation: {
      /**
			addMultipleChoice,
			deleteMultipleChoice,
			updateMultipleChoiceField
		**/

      /**
		 	@param 	 {object} args - an empty MultipleChoice object
			@returns {string} the objectID of the new MultipleChoice, or an error message
		**/
      addMultipleChoice: async (_, args) => {
        const { multipleChoice } = args;
        const objectId = new ObjectId();
        const { questionId, questionString, correctAnswer } = multipleChoice;
        const newMultipleChoice = new MultipleChoice({
          _id: objectId,
          questionId: questionId,
          questionString: questionString,
          choice: choice,
        });
        const updated = await newMultipleChoice.save();
        if (updated) return objectId;
        else return "Could not add multipleChoice";
      },
      /**
		 	@param 	 {object} args - a MultipleChoice objectID
			@returns {boolean} true on successful delete, false on failure
		**/
      deleteMultipleChoice: async (_, args) => {
        const { _id } = args;
        const objectId = new ObjectId(_id);
        const deleted = await MultipleChoice.deleteOne({ _id: objectId });
        if (deleted) return true;
        else return false;
      },
      /**
		 	@param 	 {object} args - a MultipleChoice objectID, field (questionId, questionString, etc), and the update value
			@returns {boolean} true on successful update, false on failure
		**/
      updateMultipleChoiceField: async (_, args) => {
        const { field, value, _id } = args;
        const objectId = new ObjectId(_id);
        const updated = await MultipleChoice.updateOne(
          { _id: objectId },
          { [field]: value }
        );
        if (updated) return true;
        else return false;
      },
    },
  }

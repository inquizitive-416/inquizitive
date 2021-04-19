const { gql } = require('apollo-server');
const fibInstanceDef = require('./fibInstance-def').typeDefs;
const fillInTheBlankDef = require('./fillInTheBlank-def').typeDefs;
const mcqInstanceDef = require('./mcqInstance-def').typeDefs;
const multipleChoiceDef = require('./multipleChoice-def').typeDefs;
const mtpInstanceDef = require('./mtpInstance-def').typeDefs;
const mtpQuestionDef = require('./MTPQuestion-def').typeDefs;
const orderInstanceDef = require('./orderQuestionInstance-def').typeDefs;
const orderQuestionDef = require('./orderQuestion-def').typeDefs;
const quizDef = require('./quiz-def').typeDefs;
const quizInstanceDef = require('./quizInstance-def').typeDefs;
const usersDef = require('./users-def').typeDefs;

const rootDef = gql`
	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}
`;

module.exports = {
	typeDefs: [
		rootDef, 
		fillInTheBlankDef, 
		fibInstanceDef, 
		mcqInstanceDef, 
		multipleChoiceDef, 
		mtpInstanceDef, 
		mtpQuestionDef,
		orderInstanceDef,
		orderQuestionDef,
		quizDef, 
		quizInstanceDef, 
		usersDef
	] 
};
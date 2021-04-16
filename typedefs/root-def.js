const { gql } = require('apollo-server');
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
	typeDefs: [rootDef, usersDef] 
};
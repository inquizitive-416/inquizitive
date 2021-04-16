import 'bootstrap/dist/css/bootstrap.min.css';
import React 	from 'react';
import ReactDOM from 'react-dom';
import App 		from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const cache = new InMemoryCache({

	/*
		The cache object ids are generated using the objectID(a string) instead
		of the number id so that objects are refered to consistently across the
		client and server
	*/
	dataIdFromObject: object => `${object.__typename}:${object._id}`,
	typePolicies: {
		Query: {
			fields: {
				getAllEntries: {
					merge(existing, incoming){
						return incoming
					}
				},
			},
		},
	},
});

var BACKEND_LOCATION = 'http://localhost:4000/graphql';

if (process.env.SERVER === 'true') {
	BACKEND_LOCATION = '/graphql';
}

const client = new ApolloClient({
	uri: BACKEND_LOCATION,
	// Credentials: include is necessary to pass along the auth cookies with each server request
	credentials: 'same-origin',
	cache: cache,
});





ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
	    	<App />
		</ApolloProvider>
  	</React.StrictMode>,
  	document.getElementById('root')
);
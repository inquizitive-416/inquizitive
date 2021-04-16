import React 			from 'react';
import Explorescreen 		from './components/explorescreen/Explorescreen';
import CreateScreen         from './components/createscreen/CreateScreen';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

 
const App = () => {
 

	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/explore"} } />
				<Route 
					path="/explore" 
					name="explore" 
	                 render={() => <Explorescreen /> }/>
					<Route 
					path="/create" 
					name="create" 
					component = {CreateScreen}/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
import React 			from 'react';
import Explorescreen 		from './components/explorescreen/Explorescreen';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
const App = () => {

	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/explore"} } />
				<Route 
					path="/explore" 
					name="explore" 
					render={() => 
						<Explorescreen/>
					} 
				/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
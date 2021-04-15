import React 			from 'react';
import Explorescreen 		from './components/explorescreen/Explorescreen';
import createScreen         from './components/createscreen/createScreen';
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
					component = {createScreen}/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
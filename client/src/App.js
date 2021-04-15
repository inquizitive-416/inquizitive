import React 			from 'react';

import Welcomescreen 		from './components/welcomescreen/Welcomescreen';
import Regscreen 		from './components/welcomescreen/RegisterModal';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
const App = () => {

	return(
		// render={() => 
			<Regscreen/>
		// } 
		// <BrowserRouter>
		// 	<Switch>
		// 		<Redirect exact from="/" to={ {pathname: "/explore"} } />
		// 		<Route 
		// 			path="/explore" 
		// 			name="explore" 
		// 			render={() => 
		// 				<Explorescreen/>
		// 			} 
		// 		/>
		// 		<Route/>
		// 	</Switch>
		// </BrowserRouter>
	);
}

export default App;
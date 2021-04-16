import React from 'react';
import Welcome from './components/welcomescreen/Welcomescreen';
import Explorescreen from './components/explorescreen/Explorescreen';
import CreateScreen from './components/createscreen/createScreen';
import Settingsscreen from './components/settingsscreen/Settingsscreen';
import Shopscreen from './components/shopscreen/Shopscreen';
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
				<Route 
					path="/welcome" 
					name="welcome" 
					render={() => 
						<Welcome/>
					} 
				/>
				<Route 
					path="/create" 
					name="create" 
					render={() => 
						<CreateScreen/>
					} 
				/>
				<Route 
					path="/settings" 
					name="settings" 
					render={() => 
						<Settingsscreen/>
					} 
				/>
				<Route 
					path="/shop" 
					name="shop" 
					render={() => 
						<Shopscreen/>
					} 
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
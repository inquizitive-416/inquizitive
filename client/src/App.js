import React,{useState} from 'react';
import Welcome from './components/welcomescreen/Welcomescreen';
import Explorescreen from './components/explorescreen/Explorescreen';
import CreateScreen from './components/createscreen/CreateScreen';
import Settingsscreen from './components/settingsscreen/Settingsscreen';
import Shopscreen from './components/shopscreen/Shopscreen';
import Profilescreen from "./components/profilescreen/Profilescreen";
import GamePlay from "./components/gameplay/GamePlay";
import BeginContscreen from "./components/beginContScreen/BeginContScreen";

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as queries 	from './components/welcomescreen/cache/queries';
import { useQuery } from '@apollo/client';


const App = (props) => {
	
	let user = null;
  	const { loading, error, data, refetch } = useQuery(queries.GETUSER);

	if (error) { console.log("ERROR:\n", error); }
	if (loading) { console.log("Loading...") }
	if (data) {
		let { getCurrentUser } = data;
		if (getCurrentUser !== null) {

		user = getCurrentUser;
		}
	}
	// const user= data ? data.getCurrentUser : null;
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from='/' to ={{pathname:"/welcome"}}/>
				<Route 
					
					path="/explore" 
					name="explore" 
					render={() => 
						<Explorescreen 
						user={user}
						/>
					}
				
				/>
				<Route 
					exact path="/welcome" 
					name="welcome" 
					render={(props) => 
						!user ? <Welcome user={user} {...props} fetchUser={refetch}  /> : <Redirect to ={{pathname:"/explore"}} />
					} 
				/>
				<Route 
					exact path="/create" 
					name="create" 
					render={(props) => 
						<CreateScreen user={user} {...props} fetchUser={refetch}/>
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
					path="/begin" 
					name="begin" 
					render={() => 
						<BeginContscreen/>
					} 
				/>
				<Route 
					path="/shop" 
					name="shop" 
					render={() => 
						<Shopscreen/>
					} 
				/>
				<Route
					path="/platform/:id"
					name="platform"
					render={(props) => <Profilescreen {...props} />}
					/>
				<Route
					path="/play"
					name="play"
					render={() => <GamePlay />}
					/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
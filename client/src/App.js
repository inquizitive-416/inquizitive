import React,{useState} from 'react';
import Welcome from './components/welcomescreen/Welcomescreen';
import Explorescreen from './components/explorescreen/Explorescreen';
import CreateScreen from './components/createscreen/createScreen';
import Settingsscreen from './components/settingsscreen/Settingsscreen';
import Shopscreen from './components/shopscreen/Shopscreen';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as queries 	from './cache/queries';
import { useQuery } from '@apollo/client';


const App = () => {
	// let user = null;
	// const [user,setUser]=useState(null)
	const { loading, error, data, refetch } = useQuery(queries.GETUSER);
	console.log("here");
	if (error) { console.log("ERROR:\n", error); }
	if (loading) { console.log("Loading...") }
	
	const user= data ? data.getCurrentUser : null;
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
					path="/welcome" 
					name="welcome" 
					render={() => 
						!user ? <Welcome user={user} fetchUser={refetch} /> : <Redirect to ={{pathname:"/explore"}} />
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
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PetForm from './components/PetForm';
import PetList from './containers/PetList';
import PetFind from './components/PetFind';
import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header/>
						<Route exact path={"/"} component={PetList}/>
						<Route exact path={"/details"} component={PetForm}/>
						<Route exact path={"/details/:rfid"} component={PetForm}/>
						<Route path={"/find"} component={PetFind}/>
				</div>
			</BrowserRouter>
		)
	}
}
	
export default App;
	
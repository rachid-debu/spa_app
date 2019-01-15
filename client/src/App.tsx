import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import PetForm from './components/PetForm'
import PetList from './containers/PetList'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Route exact path={"/"} component={PetList} />
					<Route exact path={"/details"} component={PetForm} />
					<Route exact path={"/details/:rfid"} component={PetForm} />
				</div>
			</BrowserRouter>
		)
	}
}
	
export default App
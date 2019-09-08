import { Icon } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import PetItem from '../components/PetItem';
import PetModel from '../models/PetModel';
import PetService from '../services/petService';

interface State {
	pets: PetModel[];
	error?: Error;
	loading: boolean;
}

class PetList extends Component<{}, State> {
	public componentWillMount() {
		this.setState({
			loading: true,
			error: undefined,
			pets: [],
		});
	}

	public componentDidMount() {
		PetService.fetchPets()
			.then((data: PetModel[]) => this.setState({ pets: data, loading: false }))
			.catch((error: Error) => this.setState({ error, loading: false }));
	}

	public render() {
		// will contain the dynamic part of this view
		let element;

		// Data is still being fetched
		if (this.state.loading) {
			element = <Icon>loader</Icon>;
		} else if (this.state.error) {
			element = <div>An error has occured while fetching data</div>;
		} else if (!this.state.pets.length) {
			element = (
				<div>
					No pets found, you can add some by clicking here :{' '}
					<NavLink to='/details'>
						<Icon>add</Icon>
					</NavLink>
				</div>
			);
		} else {
			element = (
				<div className='container'>
					{   // Loop through all pets and display a PetItem
						this.state.pets.map((pet: PetModel, _: number) => {
							return <PetItem key={pet.rfid} pet={pet}/>;
						})}
				</div>
			);
		}

		return (
			<div>
				<Header isHome={true}/>
				{element}
			</div>
		);
	}
}

export default PetList;

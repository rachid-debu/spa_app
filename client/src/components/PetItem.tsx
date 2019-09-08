import { Card, CardContent, CardHeader } from '@material-ui/core';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import PetModel from '../models/PetModel';

interface Props extends RouteComponentProps {
	pet: PetModel;
}

class PetItem extends Component<Props> {
	public onCardClick() {
		this.props.history.push('/details/' + this.props.pet.rfid);
	}

	public render() {
		// Save the pet to use it quickly
		const pet = this.props.pet;
		// We want a nicer Date format to display
		const entryDate = new Date(pet.entryDate).toLocaleDateString('en-US');

		return (
			<Card onClick={this.onCardClick.bind(this)} className='card width60'>
				<CardHeader title={pet.species} subheader={entryDate}/>
				<CardContent>
					{// If no description is provided will display a message
						pet.description ? pet.description : 'No description provided'}
				</CardContent>
			</Card>
		);
	}
}

export default withRouter(PetItem);

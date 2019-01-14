import React, { Component } from 'react'
import PetModel from '../models/PetModel'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'

interface Props extends RouteComponentProps {
    pet:PetModel
}

class PetItem extends Component<Props> {
    
    onCardClick() {
        this.props.history.push('/details/' + this.props.pet.rfid)
    }
    
    render() {
        // Save the pet to use it quickly
        var pet = this.props.pet
        // We want a nicer Date format to display
        var entryDate = new Date(pet.entryDate).toLocaleDateString("en-US")

        return (
            <Card onClick={this.onCardClick.bind(this)} className="card">
                <CardHeader title={pet.species} subheader={entryDate} />
                <CardContent>
                    {
                        // If no description is provided will display a message
                        pet.description ?
                            pet.description :
                            'No description provided' 
                    }
                </CardContent>
            </Card>
        )
    }
}

export default withRouter(PetItem)
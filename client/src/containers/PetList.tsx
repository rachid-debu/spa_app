import React, { Component } from 'react'
import PetModel from '../models/PetModel'
import PetItem from '../components/PetItem'
import { Icon } from '@material-ui/core'
import { RouteComponentProps } from 'react-router'
import PetService from '../services/petService'
import Header from '../components/Header'
import { NavLink } from 'react-router-dom'

interface Props extends RouteComponentProps {
    
}

interface State {
    pets: PetModel[],
    error?: Error,
    loading: boolean
}


class PetList extends Component<Props, State> {

    componentWillMount() {
        this.setState({
            loading: true,
            error: undefined,
            pets: []
        })
    }

    componentDidMount() {
        PetService.fetchPets()
        .then((data:PetModel[]) => this.setState({pets:data, loading:false}))
        .catch((error:Error) => this.setState({error:error, loading:false}))
    }

    render() {
        // will contain the dynamic part of this view
        var element

        // Data is still being fetched 
        if (this.state.loading) {
            element = (
                <Icon>loader</Icon>
            )
        }

        // An error has occured while fetching data
        else if (this.state.error) {
            element = (<div>An error has occured while fetching data</div>)
        }

        // Data has been loaded but is empty
        else if (!this.state.pets.length) {
            element = (<div>No pets found, you can add some by clicking here : <NavLink to="/details"><Icon>add</Icon></NavLink></div>)
        }

        // We can display data
        else {
            element = (
                <div className="container">
                    {
                        // Loop through all pets and display a PetItem
                        this.state.pets.map(function(pet:PetModel, i:number) {
                            return <PetItem key={pet.rfid} pet={pet}/>
                        })
                    }
                </div>
            )
        }
        
        return (
            <div>
                <Header isHome={true} />
                {element}
            </div>
        )
    }
}

export default PetList
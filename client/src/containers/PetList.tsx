import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../reducers/petReducer';
import { Dispatch } from 'redux';
import { actionFetchPets } from '../actions/petActions';
import PetModel from '../models/PetModel';
import PetItem from '../components/PetItem'
import { Icon } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';

interface PetListProps extends StateProps, DispatchProps, RouteComponentProps {
    
}

class PetList extends Component<PetListProps> {

    componentDidMount() {
        this.props.fetchPets()
    }

    render() {
        if (this.props.pets === undefined) {
            return (
                <Icon>loader</Icon>
            )
        }

        return (
            <div className="container">
                {
                    // Loop through all pets and display a PetItem
                    this.props.pets.map(function(pet:PetModel, i:number) {
                        return <PetItem key={pet.rfid} pet={pet}/>
                    })
                }
            </div>
        )
    }
}

interface StateProps {
    pets?: PetModel[]
}

interface DispatchProps {
    fetchPets: typeof actionFetchPets
}

// Map the state to props
const mapStateToProps = (state:AppState):StateProps => {
    return {
        pets: state.pets
    }
}

// Map dispatch to props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchPets: () => dispatch(actionFetchPets())
    }
}

// Connect the component to the redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PetList))
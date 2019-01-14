import React, { Component, FormEvent } from 'react'
import '../App.css'
import PetModel from '../models/PetModel';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux'
import { AppState } from '../reducers/petReducer';
import { Dispatch } from 'redux';
import { actionFetchPet, actionAddPet, actionEditPet } from '../actions/petActions';
import { CircularProgress } from '@material-ui/core';

interface Props extends StateProps, DispatchProps, RouteComponentProps<{rfid?:string}> {
    pet?:PetModel,
    edit:boolean
}

class PetForm extends Component<Props, {}> {

    static defaultProps = {
        edit:false
    }

    onSubmit(event:FormEvent) {
        event.preventDefault()
        this.props.putPet(this.state as PetModel)
        this.props.history.push('/')
    }

    onChange(event:any) {
        let target = event.target
        let value = (target.type === 'checkbox') ? target.checked : target.value;
        let name = target.name

        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        // we set to edit mode
        PetForm.defaultProps.edit = (this.props.match.params.rfid) ? true : false

        // we bind this to events
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        // If rfid is in the request
        if (this.props.match.params.rfid) {
            // we fetch the pet
            this.props.fetchPet(this.props.match.params.rfid)
        }
    }

    componentWillReceiveProps(props:Props) {
        this.setState(props.pet ? props.pet : {})
    }

    render() {
        // Save values
        let rfid = this.props.match.params.rfid
        let pet = this.props.pet

        // If we have an RFID but not yet fetched the PET
        if (pet === undefined && rfid !== undefined) {
            // We display a loader
            return (<CircularProgress className="absolute-center" />)
        }
        
        // We need to prepare dates

        return (
            <form onSubmit={this.onSubmit} className="container">
                <fieldset>
                    <label htmlFor="rfid">
                        RFID chip number
                        <input type="text" id="rfid" name="rfid" className="form-control" defaultValue={pet ? pet.rfid : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="species">
                        Species
                        <input type="text" id="species" name="species" className="form-control" defaultValue={pet ? pet.species : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="race">
                        Race
                        <input type="text" id="race" name="race" className="form-control" defaultValue={pet ? pet.race : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="description">
                        Description
                        <textarea id="description" name="description" defaultValue={pet ? pet.description : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="height">
                        Height
                        <input type="number" id="height" name="height" className="form-control" defaultValue={pet ? pet.height.toString() : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="weight">
                        Weight
                        <input type="number" id="weight" name="weight" className="form-control" defaultValue={pet ? pet.weight.toString() : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="entry_date">
                        Entry date
                        <input type="date" id="entry_date" name="entry_date" className="form-control" defaultValue={pet ? new Date(pet.entryDate).toISOString().substr(0, 10) : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="birth_date">
                        Birth date
                        <input type="date" id="birth_date" name="birth_date" className="form-control" defaultValue={pet ? new Date(pet.birthDate).toISOString().substr(0, 10) : ''} onChange={this.onChange}/>
                    </label>
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn-primary">
                        {
                            // If we have an rfid, this is edit
                            rfid ? 'Edit' : 'Save'
                        }
                    </button>
                </fieldset>
            </form>
        )
    }

}

interface StateProps {
    pet?: PetModel
}

interface DispatchProps {
    fetchPet: typeof actionFetchPet,
    postPet: typeof actionAddPet,
    putPet: typeof actionEditPet
}

// Map the state to props
const mapStateToProps = (state:AppState):StateProps => {
    return {
        pet: state.pet
    }
}

// Map dispatch to props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchPet: (rfid:string) => dispatch(actionFetchPet(rfid)),
        postPet: (pet:PetModel) => dispatch(actionAddPet(pet)),
        putPet: (pet:PetModel) => dispatch(actionEditPet(pet)),
    }
}

// Connect the component to the redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PetForm))
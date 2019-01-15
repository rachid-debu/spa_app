import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import '../App.css';
import PetModel from '../models/PetModel';
import PetService from '../services/petService';
import Header from './Header';

interface State {
    rfid:string,
    errorMessage:string
}

class PetFind extends Component<RouteComponentProps, State> {

    constructor(props:RouteComponentProps) {
        super(props)
        this.state = {
            rfid:'',
            errorMessage:''
        }
    }

    handleChange(event:any) {
        // we set the rfid provided
        this.setState({
            rfid: event.target.value
        })
    }

    handleSubmit(event:FormEvent) {
        // prevent redirection
        event.preventDefault()

        // if rfid has been provided
        if (this.state.rfid.length) {
            // we send a fetch request
            PetService.fetchPet(this.state.rfid)
                .then((pet:PetModel) => {
                    // if we found, we redirect to details page of this rfid. else we show an error message
                    pet != null ? this.props.history.push('/details/' + pet.rfid) : this.setState({errorMessage:'No pet found with this RFID'})
                }) 
                .catch((err:Error) => {
                    // we display the error message
                    this.setState({errorMessage:err.message})
                })
        }

        // if rfid is not provided we show an error message
        else {
            this.setState({errorMessage:'Please fill the RFID'})
        }
    }

    render() {
        return (
            <div>
                <Header isHome={false} />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <label>
                            Find by RFID chip number
                            <input type="text" id="rfid" name="rfid" className="form-control" onChange={(event) => this.handleChange(event)} />
                        </label>
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-primary">Find</button>
                    </fieldset>

                    {/* if needed we display an error message */}
                    {this.state.errorMessage.length ? (<fieldset className="red">{this.state.errorMessage}</fieldset>) : ''}
                </form>
            </div>
        )
    }

}

export default PetFind
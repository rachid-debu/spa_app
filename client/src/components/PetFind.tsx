import React, { Component, FormEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import '../App.css'
import PetModel from '../models/PetModel'
import PetService from '../services/petService'
import Header from './Header'
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'

interface Props extends RouteComponentProps {
    open:boolean
}

interface State {
    rfid:string,
    errorMessage:string,
    open:boolean
}

class PetFind extends Component<Props, State> {

    state = {
        rfid:'',
        errorMessage:'',
        open:this.props.open
    }

    handleClose() {
        this.setState((prevState) => ({
            ...prevState,
            open: false
        }))
    }

    handleChange(event:any) {
        // we set the rfid provided
        this.setState({
            rfid: event.target.value
        })
    }

    handleSubmit() {
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
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Find a Pet by RFID chip number
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rfid"
                        label="RFID chip number"
                        type="text"
                        fullWidth
                    />
                    {/* if needed we display an error message */}
                    {this.state.errorMessage.length ? (<fieldset className="red">{this.state.errorMessage}</fieldset>) : ''}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Find
                    </Button>
                </DialogActions>
            </Dialog>
        )

    }

}

export default withRouter(PetFind)
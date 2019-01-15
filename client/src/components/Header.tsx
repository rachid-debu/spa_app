import React, { Component } from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import PetModel from '../models/PetModel'
import PetService from '../services/petService'
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Icon,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'

interface Props extends RouteComponentProps {
  isHome: boolean
}

interface State {
  dialogOpen: boolean
  rfid: string
  errorMessage: string
}

class Header extends Component<Props, State> {
  state = {
    dialogOpen: false,
    rfid: '',
    errorMessage: ''
  }

  goBack () {
    this.props.history.goBack()
  }

  openDialog () {
    this.setState({
      dialogOpen: true,
      rfid: '',
      errorMessage: ''
    })
  }

  closeSearchDialog () {
    this.setState({
      dialogOpen: false,
      rfid: '',
      errorMessage: ''
    })
  }

  // Submit the search dialog
  handleSearchDialogSubmit () {
    // if rfid has been provided
    if (this.state.rfid.length) {
      // we send a fetch request
      PetService.fetchPet(this.state.rfid)
        .then((pet: PetModel) => {
          // if we found, we redirect to details page of this rfid. else we show an error message
          pet != null
            ? this.props.history.push('/details/' + pet.rfid)
            : this.setState({
              errorMessage: 'No pet found with this RFID'
            })
        })
        .catch((err: Error) => {
          // we display the error message
          this.setState({ errorMessage: err.message })
        })
    } else {
      this.setState({ errorMessage: 'Please fill the RFID' })
    }
  }

  handleSearchDialogTextfieldChange (event: any) {
    // we set the rfid provided
    this.setState({
      rfid: event.target.value
    })
  }

  // RIGHT : Add button / nothing
  renderToolbarRightButton () {
    // on home page
    if (this.props.isHome) {
      // we show a '+' button
      return (
        <IconButton
          color='inherit'
          onClick={() => this.props.history.push('/details')}
        >
          <Icon>add</Icon>
        </IconButton>
      )
    } else {
      // invisible button (trick)
      return (
        <IconButton color='primary'>
          <Icon>add</Icon>
        </IconButton>
      )
    }
  }

  // LEFT : Search button / Go back button
  renderToolbarLeftButton () {
    if (this.props.isHome) {
      return (
        <IconButton color='inherit' onClick={() => this.openDialog()}>
          <Icon>search</Icon>
        </IconButton>
      )
    } else {
      return (
        <IconButton color='inherit' onClick={() => this.goBack()}>
          <Icon>arrow_back</Icon>
        </IconButton>
      )
    }
  }

  render () {
    return (
      <AppBar color='primary' position='sticky'>
        <Toolbar
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {this.renderToolbarLeftButton()}
          <IconButton
            color='inherit'
            onClick={() => this.props.history.push('/')}
          >
            SPA
          </IconButton>
          {this.renderToolbarRightButton()}
        </Toolbar>

        {/* The dialog containing search form */}
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => this.closeSearchDialog()}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Find a Pet</DialogTitle>
          <DialogContent>
            <form
              onSubmit={event => {
                event.preventDefault()
                this.handleSearchDialogSubmit()
              }}
            >
              <TextField
                autoFocus
                id='rfid'
                label='RFID chip number'
                type='text'
                fullWidth
                onChange={event =>
                  this.handleSearchDialogTextfieldChange(event)
                }
                helperText={
                  this.state.errorMessage.length ? this.state.errorMessage : ''
                }
                error={this.state.errorMessage.length > 0}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeSearchDialog()} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => this.handleSearchDialogSubmit()}
              color='primary'
            >
              Find
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    )
  }
}

export default withRouter(Header)

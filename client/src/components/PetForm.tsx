import React, { Component, FormEvent } from 'react'
import '../App.css'
import PetModel from '../models/PetModel'
import { RouteComponentProps } from 'react-router'
import { CircularProgress, TextField, Button, Grid } from '@material-ui/core'
import PetService from '../services/petService'
import Header from './Header'

interface Props extends RouteComponentProps<{ rfid?: string }> {}

interface State {
  pet: PetModel
  rfid: string
  edit: boolean
  errors: {
    rfid?: string;
    species?: string;
    race?: string;
    height?: string;
    weight?: string;
    description?: string;
    entryDate?: string;
    birthDate?: string;
  }
}

class PetForm extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    // Initially pet is undefined and we determine if we're on edit or creation mode
    this.state = {
      pet: {
        rfid: '',
        species: '',
        race: '',
        height: 0,
        weight: 0,
        description: '',
        entryDate: new Date(),
        birthDate: new Date()
      },
      rfid: props.match.params.rfid ? props.match.params.rfid : '',
      // if we have an rfid, it's edit else it's create
      edit: props.match.params.rfid !== undefined ? true : false,
      // by default no errors yet
      errors: {}
    }
  }

  onSubmit (event: FormEvent) {
    // prevent default page refresh/redirect
    event.preventDefault()

    // send the form Edit or Save
    if (this.state.edit) {
      // mode is Edit
      PetService.editPet(this.state.pet)
        .then(res => {
          // if something went wrong res.errors contains informations
          if (res.hasOwnProperty('errors') && res.errors) {
            // we 'temp' errors so we can display them all at once
            let errorsTemp: any = {}
            for (let key in res.errors) {
              let message = res.errors[key].message
              errorsTemp[key] = message
            }
            // add errors to state
            this.setState({ errors: errorsTemp })
          } else {
            // if we success we redirect to home
            this.props.history.push('/')
          }
        })
        .catch((error: Error) => {
          // UNEXPECTED ! we display an obnoxious alert
          alert(
            'An error occured with the server, please contact customer support.'
          )
          console.error(error)
        })
    } else {
      // mode is Save
      PetService.addPet(this.state.pet)
        .then(res => {
          // if something went wrong res.errors contains informations
          if (res.hasOwnProperty('errors') && res.errors) {
            // we 'temp' errors so we can display them all at once
            let errorsTemp: any = {}
            for (let key in res.errors) {
              let message = res.errors[key].message
              errorsTemp[key] = message
            }
            // add errors to state
            this.setState({ errors: errorsTemp })
          } else {
            // if we success we redirect to home
            this.props.history.push('/')
          }
        })
        .catch((error: Error) => {
          // UNEXPECTED ! we display an obnoxious alert
          alert(
            'An error occured with the server, please contact customer support.'
          )
          console.error(error)
        })
    }
  }

  onChange (event: any) {
    let target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name

    // add the value to the pet state
    this.setState(prevState => ({
      pet: { ...prevState.pet, [name]: value }
    }))
  }

  componentDidMount () {
    // If it's edit mode we have an rfid
    if (this.state.edit) {
      // we fetch the pet
      PetService.fetchPet(this.state.rfid)
        .then((data: PetModel) => {
          console.log('fetchPet data received from backend', data)
          this.setState({ pet: data })
        })
        .catch(error => {
          console.log('fetchPet error received from backend', error)
          this.props.history.push('/details')
        })
    }
  }

  render () {
    // shorten variable names
    let rfid = this.state.rfid
    let pet = this.state.pet
    let edit = this.state.edit

    // If we have an RFID but not yet fetched the PET
    if (!pet.rfid.length && rfid.length) {
      // We display a loader
      return <CircularProgress className='absolute-center' />
    }

    return (
      <React.Fragment>
        <Header isHome={false} />
        <Grid container direction='column' spacing={0} alignItems='center'>
          <form onSubmit={event => this.onSubmit(event)}>
            <TextField
              label='RFID chip number'
              type='text'
              id='rfid'
              name='rfid'
              autoFocus
              margin='normal'
              fullWidth
              value={pet.rfid}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.rfid}
              error={this.state.errors.rfid !== undefined}
            />
            <TextField
              label='Species'
              type='text'
              id='species'
              name='species'
              margin='normal'
              fullWidth
              value={pet.species}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.species}
              error={this.state.errors.species !== undefined}
            />
            <TextField
              label='Race'
              type='text'
              id='race'
              name='race'
              margin='normal'
              fullWidth
              value={pet.race}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.race}
              error={this.state.errors.race !== undefined}
            />
            <TextField
              multiline
              rowsMax='4'
              label='Description'
              id='description'
              name='description'
              margin='normal'
              fullWidth
              value={pet.description}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.description}
              error={this.state.errors.description !== undefined}
            />
            <TextField
              label='Height'
              type='text'
              id='height'
              name='height'
              margin='normal'
              fullWidth
              value={pet.height.toString()}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.height}
              error={this.state.errors.height !== undefined}
            />
            <TextField
              label='Weight'
              type='text'
              id='weight'
              name='weight'
              margin='normal'
              fullWidth
              value={pet.weight.toString()}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.weight}
              error={this.state.errors.weight !== undefined}
            />
            <TextField
              label='Entry date'
              type='date'
              id='entryDate'
              name='entryDate'
              margin='normal'
              fullWidth
              defaultValue={new Date(pet.entryDate).toISOString().substr(0, 10)}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.entryDate}
              error={this.state.errors.entryDate !== undefined}
            />
            <TextField
              label='Birth date'
              type='date'
              id='birthDate'
              name='birthDate'
              margin='normal'
              fullWidth
              defaultValue={new Date(pet.birthDate).toISOString().substr(0, 10)}
              onChange={event => this.onChange(event)}
              helperText={this.state.errors.birthDate}
              error={this.state.errors.birthDate !== undefined}
            />
            <Button type='submit' color='primary' variant='contained'>
              {edit ? 'Edit' : 'Save'}
            </Button>
          </form>
        </Grid>
      </React.Fragment>
    )
  }
}

export default PetForm

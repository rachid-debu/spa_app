import React, { Component, FormEvent } from "react";
import "../App.css";
import PetModel from "../models/PetModel";
import { RouteComponentProps, withRouter } from "react-router";
import { CircularProgress } from "@material-ui/core";
import PetService from "../services/petService";
import Header from "./Header";

interface Props extends RouteComponentProps<{ rfid?: string }> {

}

interface State {
  pet: PetModel,
  rfid: string,
  edit: boolean
}

class PetForm extends Component<Props, State> {

  constructor(props:Props) {
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
      edit: (props.match.params.rfid !== undefined) ? true : false
    }
  }
  
  onSubmit(event: FormEvent) {
    // prevent default page refresh/redirect
    event.preventDefault()

    // send the form Edit or Save
    if (this.state.edit) {
      // mode is Edit
      PetService.editPet(this.state.pet)
      .then((res:any) => {
        console.log(res)
        // if we success we redirect to home
        this.props.history.push("/")
      })
      .catch((error: Error) => {
        // if error we display the error
        console.log(error)
      });
    } else {
      // mode is Save
      PetService.addPet(this.state.pet)
      .then((res:any) => {
        console.log(res)
        // if we success we redirect to home
        this.props.history.push("/")
      })
      .catch((error: Error) => {
        // if error we display the error
        console.log(error)
      });
    }
  }

  onChange(event: any) {
    let target = event.target
    let value = target.type === "checkbox" ? target.checked : target.value
    let name = target.name

    // add the value to the pet state
    this.setState((prevState) => ({pet : {...prevState.pet, [name]:value}}))
  }

  componentDidMount() {
    // If it's edit mode we have an rfid
    if (this.state.edit) {
      // we fetch the pet
      PetService.fetchPet(this.state.rfid)
        .then((data:PetModel) => {
          console.log('fetchPet data received from backend', data)
          this.setState({pet: data})
        })
        .catch((error) => {
          console.log('fetchPet error received from backend', error)
          this.props.history.push('/details')
        })
    }
  }

  render() {
    // shorten variable names
    let rfid = this.state.rfid
    let pet = this.state.pet
    let edit = this.state.edit

    // If we have an RFID but not yet fetched the PET
    if (pet === undefined && rfid.length) {
      // We display a loader
      return <CircularProgress className="absolute-center" />;
    }

    return (
      <div>
        <Header isHome={false} />
        <form onSubmit={(event) => this.onSubmit(event)} className="container">
          <fieldset>
            <label htmlFor="rfid">
              RFID chip number
              <input
                type="text"
                id="rfid"
                name="rfid"
                className="form-control"
                value={pet.rfid}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="species">
              Species
              <input
                type="text"
                id="species"
                name="species"
                className="form-control"
                value={pet.species}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="race">
              Race
              <input
                type="text"
                id="race"
                name="race"
                className="form-control"
                value={pet.race}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                value={pet.description}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="height">
              Height
              <input
                type="text"
                id="height"
                name="height"
                className="form-control"
                value={pet.height.toString()}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="weight">
              Weight
              <input
                type="text"
                id="weight"
                name="weight"
                className="form-control"
                value={pet.weight.toString()}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="entryDate">
              Entry date
              <input
                type="date"
                id="entryDate"
                name="entryDate"
                className="form-control"
                defaultValue={new Date(pet.entryDate).toISOString().substr(0, 10)}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="birthDate">
              Birth date
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="form-control"
                defaultValue={new Date(pet.birthDate).toISOString().substr(0, 10)}
                onChange={(event) => this.onChange(event)}
              />
            </label>
          </fieldset>
          <fieldset>
            <button type="submit" className="btn btn-primary">
              {edit ? "Edit" : "Save"}
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(PetForm)
import React, { Component } from 'react'
import '../App.css'

class PetFind extends Component {

    render() {
        return (
            <form action="findPet" method="GET">
                <fieldset>
                    <label>
                        Find by RFID chip number
                        <input type="text" id="rfid" name="rfid" className="form-control"/>
                    </label>
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn-primary">Find</button>
                </fieldset>
            </form>
        )
    }

}

export default PetFind
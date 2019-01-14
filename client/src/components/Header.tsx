import React, { Component } from 'react'
import { Icon } from 'react-materialize'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <nav className="nav-wrapper blue darken-1">
                <div className="container">
                    <NavLink to="/find" className="left"><Icon>search</Icon></NavLink>
                    <NavLink to="/" className="brand-logo center">SPA</NavLink>
                    <NavLink to="/details" className="right"><Icon>add</Icon></NavLink>
                </div>
            </nav>
        );
    }
}

export default Header;
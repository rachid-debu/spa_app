import React, { Component } from 'react'
import { Icon } from 'react-materialize'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {
    isHome:boolean
}

class Header extends Component<Props, {}> {

    goBack() {
        this.props.history.goBack()
    }

    render() {
        var leftButton
        var rightButton

        if (this.props.isHome) {
            leftButton = <NavLink to={{pathname:"/find", state: {isHome:false}}} className="left"><Icon>search</Icon></NavLink>
            rightButton = <NavLink to="/details" className="right"><Icon>add</Icon></NavLink>
        } else {
            leftButton = <a className="left" onClick={() => this.goBack()}><Icon>arrow_back</Icon></a>
        }

        return (
            <nav className="nav-wrapper blue darken-1">
                <div className="container">
                    {leftButton}
                    <NavLink to="/" className="brand-logo center">SPA</NavLink>
                    {rightButton}
                </div>
            </nav>
        )
    }
}

export default withRouter(Header)
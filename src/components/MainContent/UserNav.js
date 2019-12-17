import React, { Component } from 'react'
import Profile from '../../img/profile.png'
import MaterialIcon from "material-icons-react";

class UserNav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showMenu: false
        }
    }

    showMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    
    render() {
        return (
            <div className={this.state.showMenu? "dropdown user-menu show" : "dropdown user-menu" }
            onClick = {() => this.showMenu()}
            >
            <button className="dropdown-toggle" type="button" data-toggle="dropdown">
                <img src={Profile} className="user-image" alt="User Image"/>
                <div className="user-info">
                    <h6>Sam Shayesta</h6>
                    <span>municipality officer</span>
                </div>
            </button>
            <ul className={this.state.showMenu? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right" }>
                {/* <!-- User image --> */}
                <li>
                    <a href="profile.html">
                        My Profile
                    </a>
                </li>
                <li>
                    <a href="#"> Account Setting </a>
                </li>

                <li className="dropdown-footer">
                    <a href="signin.html"> <MaterialIcon className="material-icons" icon="power_settings_new"></MaterialIcon>
                        Log Out
                    </a>
                </li>
            </ul>
        </div>
        )
    }
}
export default UserNav;

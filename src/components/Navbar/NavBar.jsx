import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "../assets/NavBar.css";

class NavBar extends Component {
    state = {};
    render() {
        return (
            <div>
                <div className='container'>
                    <h1>
                        <a href='#menu'>
                            <FaBars />
                        </a>
                    </h1>
                    <div className='popover' id='menu'>
                        <div className='content'>
                            <a href='#' className='close'></a>
                            <div className='nav'>
                                <ul className='nav_list'>
                                    <div className='nav_list_item'>
                                        <li>
                                            <NavLink to='/login'>Login</NavLink>
                                        </li>
                                    </div>
                                    <div className='nav_list_item'>
                                        <li>
                                            <NavLink to='/signup'>
                                                Sign Up
                                            </NavLink>
                                        </li>
                                    </div>
                                    <div className='nav_list_item'>
                                        <li>
                                            <NavLink to='/demo'>Demo</NavLink>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;

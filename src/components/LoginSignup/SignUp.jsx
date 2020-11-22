import React, { Component } from "react";
import "../assets/Signup.css";
import { FaBackward } from "react-icons/fa";
import { withRouter, Link } from "react-router-dom";

class SignUp extends Component {
    state = {
        first_name: "",
        username: "",
        password: "",
        city: "",
        signin_error: "",
        confirm_signup: false,
        signup_pressed: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
        });
    };
    handleInputValidation = () => {
        if (
            this.state.first_name !== "" &&
            this.state.username !== "" &&
            this.state.password !== "" &&
            this.state.city !== ""
        ) {
            return (
                <button
                    className='signup-button'
                    onClick={(e) => {
                        e.preventDefault();
                        const adduser = {
                            first_name: this.state.first_name,
                            username: this.state.username,
                            password: this.state.password,
                            city: this.state.city,
                        };
                        this.props.handleAddUser(adduser);

                        this.setState({
                            signup_pressed: true,
                        });
                    }}
                >
                    Sign Up
                </button>
            );
        }
    };

    handleConfirm = () => {
        if (this.state.signup_pressed) {
            return (
                <div>
                    <Link to={`/user/${this.state.username}`}>
                        <button
                            className='signup-button'
                            onClick={() => this.clearForm()}
                        >
                            Confirm
                        </button>
                    </Link>
                </div>
            );
        }
    };
    clearForm = () => {
        document.getElementById("user-signup").reset();
    };
    render() {
        return (
            <div className='signup-page'>
                <h1>Sign Up</h1>
                <div>
                    <span>{this.state.signin_error}</span>
                    <form id='user-signup'>
                        <label>First Name</label>
                        <input
                            type='text'
                            placeholder='Joe'
                            name='first_name'
                            onChange={this.handleChange}
                            required
                        ></input>
                        <label>Username</label>
                        <input
                            type='text'
                            placeholder='jojo123'
                            name='username'
                            onChange={this.handleChange}
                            required
                        ></input>
                        <label>Password</label>
                        <input
                            type='text'
                            placeholder='*******'
                            className='pw'
                            name='password'
                            onChange={this.handleChange}
                            required
                        ></input>
                        <label>City in California</label>
                        <input
                            type='text'
                            placeholder='Los Angeles'
                            name='city'
                            onChange={this.handleChange}
                            required
                        ></input>
                        {this.handleInputValidation()}
                    </form>
                </div>
                {this.handleConfirm()}
                <div className='back-div signup-back'>
                    <button
                        onClick={() => {
                            this.props.history.push("/");
                        }}
                        className='back-button'
                    >
                        <FaBackward />
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);

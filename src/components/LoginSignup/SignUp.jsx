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
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
        });
    };
    handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (
            this.state.first_name === "" ||
            this.state.username === "" ||
            this.state.password === "" ||
            this.state.city === ""
        ) {
            this.setState({
                signin_error: "ALL INPUTS ARE REQUIRED",
            });
        } else {
            const { first_name, username, password, city } = this.state;
            this.setState({
                confirm_signup: true,
                signin_error: "",
            });
        }
    };
    handlePostNewUser = () => {
        const { username, first_name, password, city } = this.state;
        fetch(`http://localhost:8000/api/users/${username}`)
            .then((res) => res.json())
            .then((user) => {
                if (!user) {
                    this.setState({
                        signin_error: "Sorry this username already exists",
                    });
                } else {
                    const user = {
                        first_name,
                        username,
                        password,
                        city,
                    };
                    this.props.handleAddUser(user);
                    console.log(user);
                }
            });
    };
    handleConfirmInfo = () => {
        if (this.state.confirm_signup && this.state.signin_error === "") {
            return (
                <div className='confirm-signup'>
                    <h2>
                        {this.state.first_name} from {this.state.city}
                    </h2>
                    <div className='confirm-wrapper'>
                        <Link to={`/login`}>
                            <button
                                className='confirm-btn'
                                onClick={this.handlePostNewUser}
                            >
                                Confirm
                            </button>
                        </Link>
                    </div>
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
                    {this.handleConfirmInfo()}
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
                        <button
                            className='signup-button'
                            onClick={(e) => {
                                this.handleSignUpSubmit(e);
                                this.clearForm();
                            }}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
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

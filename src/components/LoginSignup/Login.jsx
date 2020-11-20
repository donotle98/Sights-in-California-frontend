import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import "../assets/Login.css";

class Login extends Component {
    state = {
        username: "",
        password: "",
        first_name: "",
        city: "",
        user: [],
        signin_error: "",
        userExists: true,
        userMatch: false,
    };
    handleUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };
    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    handleUserNotMatch = () => {
        if (!this.state.userExists) {
            return (
                <div className='user-not-match'>
                    <h1>USER DOES NOT EXIST</h1>
                </div>
            );
        }
        if (this.state.userMatch) {
            return (
                <div className='user-matched'>
                    <h2>First Name: {this.state.first_name}</h2>
                    <div className='confirm-wrapper'>
                        <Link to={`/user/${this.state.username}`}>
                            <button className='confirm-btn'>Confirm?</button>
                        </Link>
                    </div>
                </div>
            );
        }
    };
    handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const user = {
            username: username,
            password: password,
        };
        if ((username === "" && password === "") || password === "") {
            this.setState({
                signin_error: "USERNAME AND PASSWORD ARE REQUIRED",
            });
        } else {
            this.setState({ signin_error: "" });
            fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((token) => {
                    localStorage.setItem("token", token.token);
                })
                .then(() => {
                    this.handleSubmit(e);
                });
        }
    };
    handleSubmit = (e) => {
        const { username } = this.state;
        const token = localStorage.getItem("token");
        this.setState({ signin_error: "" });
        fetch(
            `https://frozen-reaches-24867.herokuapp.com/api/login/${username}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
            .then((res) => res.json())
            .then((user) => {
                if (!user.first_name) {
                    this.setState({
                        userExists: false,
                    });
                } else {
                    this.props.handleUser({
                        first_name: user.first_name,
                        username: user.username,
                        city: user.city,
                    });
                    this.setState({
                        userExists: true,
                        userMatch: true,
                        first_name: user.first_name,
                        city: user.city,
                    });
                }
            });
    };
    clearForm = () => {
        document.getElementById("user-login").reset();
    };
    render() {
        return (
            <div className='login-div'>
                <header className='login-header'>
                    <h1>Login</h1>
                </header>

                <main>
                    <div className='input-empty'>
                        <span>{this.state.signin_error}</span>
                    </div>
                    <div>{this.handleUserNotMatch()}</div>
                    <div className='login-page'>
                        <form id='user-login'>
                            <label className='username'>Username</label>
                            <input
                                type='text'
                                placeholder='donotle'
                                name='username'
                                onChange={this.handleUsername}
                                required
                            ></input>
                            <label>Password</label>
                            <input
                                type='text'
                                className='pw-input pw'
                                placeholder='*******'
                                name='password'
                                onChange={this.handlePassword}
                                required
                            ></input>
                            <button
                                className='button'
                                onClick={(e) => {
                                    this.handleLogin(e);
                                    this.clearForm();
                                }}
                            >
                                Let's Go
                            </button>
                        </form>
                    </div>
                </main>
                <div className='back-div login-back'>
                    <button
                        onClick={() => {
                            this.props.history.goBack();
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

export default withRouter(Login);

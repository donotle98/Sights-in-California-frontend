import React, { Component } from 'react';
import '../assets/Signup.css';
import { FaBackward } from 'react-icons/fa';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { API_URL } from '../../config';

class SignUp extends Component {
    state = {
        first_name: '',
        username: '',
        password: '',
        city: '',
        signin_error: '',
        confirm_signup: false,
    };

    handleAddUser = (user) => {
        fetch(`${API_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((token) => {
                console.log(token);
                this.setState({
                    first_name: token.newUser.first_name,
                    username: token.newUser.username,
                    city: token.newUser.city,
                });
                localStorage.setItem('token', token.token);
                this.setState({
                    confirm_signup: true,
                });
                return token;
            })
            .catch((e) => {
                console.log(e);
            });
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
        });
    };
    handleInputValidation = (e) => {
        const { first_name, username, password, city } = this.state;
        if (
            first_name !== '' &&
            username !== '' &&
            password !== '' &&
            city !== ''
        ) {
            e.preventDefault();
            const newUser = {
                first_name: first_name,
                username: username,
                password: password,
                city: city,
            };
            localStorage.setItem('first_name', first_name);
            localStorage.setItem('city', city);
            this.handleAddUser(newUser);
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
        document.getElementById('user-signup').reset();
    };
    render() {
        return (
            <div className='signup-page'>
                <h1>Sign Up</h1>
                <div>
                    <span>{this.state.signin_error}</span>
                    <form
                        id='user-signup'
                        onSubmit={this.handleInputValidation}
                    >
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
                        <button type='submit'>
                            <Link to={`/user/${this.state.username}`}>
                                Submit
                            </Link>
                        </button>
                    </form>
                </div>
                <div className='back-div signup-back'>
                    <button
                        onClick={() => {
                            this.props.history.push('/');
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

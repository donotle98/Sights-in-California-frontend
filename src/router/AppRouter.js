import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomeRoute from "../components/HomeRoute";
import Login from "../components/LoginSignup/Login";
import SignUp from "../components/LoginSignup/SignUp";
import AppContext from "../store/AppContext";
import ProtectedRoute from "./ProtectedRoute";
import UserPage from "../components/UserPage/UserPage";
import Demo from "../components/Demo/Demo";

class App extends Component {
    state = {
        listSights: [],
        first_name: "",
        username: "",
        city: "",
    };
    fetchSightList = () => {
        console.log("sights are being fetched");
        fetch("http://localhost:8000/api/sights")
            .then((res) => res.json())
            .then((sight) => {
                this.setState({
                    listSights: [...this.state.listSights, sight],
                });
            });
    };
    componentDidMount() {
        this.fetchSightList();
    }
    handleLogout = () => {
        this.setState({
            first_name: "",
            username: "",
            city: "",
        });
        console.log("LOGGING OUT");
        localStorage.removeItem("token");
    };
    handleUser = (user) => {
        this.setState({
            first_name: user.first_name,
            username: user.username,
            city: user.city,
        });
    };
    handleAddUser = (user) => {
        fetch("http://localhost:8000/api/users/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((token) => {
                this.setState({
                    first_name: user.first_name,
                    username: user.username,
                    city: user.city,
                });
                localStorage.setItem("token", token.token);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    handleAddSight = (sight) => {
        fetch("http://localhost:8000/api/sights", {
            method: "POST",
            header: {
                "content-type": "application/json",
            },
            body: JSON.stringify(sight),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((e) => Promise.reject(e));
                }
                this.setState({
                    listSights: [...this.state.listSights, sight],
                });
                return res.json();
            })
            .catch((e) => {
                console.log(e);
            });
    };
    render() {
        const contextValue = {
            first_name: this.state.first_name,
            username: this.state.username,
            city: this.state.city,
            listSights: this.state.listSights,
            loggedIn: this.state.loggedIn,
            handleLogout: this.handleLogout,
        };
        return (
            <Router>
                <AppContext.Provider value={contextValue}>
                    <Switch>
                        <Route exact path='/' component={HomeRoute} />
                        <Route
                            path='/login'
                            render={() => (
                                <Login handleUser={this.handleUser} />
                            )}
                        />
                        <Route
                            exact
                            path='/signup'
                            render={() => (
                                <SignUp handleAddUser={this.handleAddUser} />
                            )}
                        />
                        <Route path='/demo' component={Demo} />
                        <ProtectedRoute component={UserPage} />
                    </Switch>
                </AppContext.Provider>
            </Router>
        );
    }
}

export default App;

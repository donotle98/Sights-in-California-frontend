import React from "react";
import ReactDOM from "react-dom";
import App from "../router/AppRouter";
import HomeRoute from "../components/HomeRoute";
import Login from "../components/LoginSignup/Login";
import SignUp from "../components/LoginSignup/SignUp";
import Demo from "../components/Demo/Demo";
import UserPage from "../components/UserPage/UserPage";
import { BrowserRouter as Router } from "react-router-dom";

it("AppRouter renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("HomeRoute renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <HomeRoute />
        </Router>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("Login page renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <Login />
        </Router>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("SignUp page renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <SignUp />
        </Router>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("Demo page renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <Demo />
        </Router>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("UserPage renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <UserPage />
        </Router>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

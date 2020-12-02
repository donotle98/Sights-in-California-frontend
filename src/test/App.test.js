import React from "react";
import ReactDOM from "react-dom";
import App from "../router/AppRouter";
import HomeRoute from "../components/HomeRoute";
import Login from "../components/LoginSignup/Login";
import SignUp from "../components/LoginSignup/SignUp";
import Demo from "../components/Demo/Demo";
import UserPage from "../components/UserPage/UserPage";
import BookmarkedCards from "../components/CardList/BookmarkedCards";
import CardList from "../components/CardList/CardList";
import UserCardList from "../components/CardList/UserCardList";
import { BrowserRouter as Router } from "react-router-dom";

const bookmarkCard = {
    image:
        "https://www.nps.gov/yose/planyourvisit/images/20170618_155330.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
    name: "Yosemite National Park",
    city: "Yosemite",
    description:
        "Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome",
    url: "https://www.nps.gov/yose/index.htm",
};
const userBookmarks = [
    {
        image:
            "https://www.nps.gov/yose/planyourvisit/images/20170618_155330.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        name: "Yosemite National Park",
        city: "Yosemite",
        description:
            "Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome",
        url: "https://www.nps.gov/yose/index.htm",
    },
    {
        image:
            "https://www.nps.gov/yose/planyourvisit/images/20170618_155330.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        name: "Yosemite National Park",
        city: "Yosemite",
        description:
            "Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome",
        url: "https://www.nps.gov/yose/index.htm",
    },
];

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
it("Bookmarked Cards renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <BookmarkedCards sight={bookmarkCard} />
        </Router>,
        div
    );
});
it("Card list renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <CardList sight={bookmarkCard} />
        </Router>,
        div
    );
});
it("User card list renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <UserCardList sight={bookmarkCard} userBookmarks={userBookmarks} />
        </Router>,
        div
    );
});

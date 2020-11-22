import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import AppContext from "../../store/AppContext";
import "../assets/UserPage.css";
import "../assets/UserPageButtons.css";
import UserCardList from "../CardList/UserCardList";
import BookmarkedCards from "../CardList/BookmarkedCards";

class UserPage extends Component {
    static contextType = AppContext;
    state = {
        first_name: "",
        city: "",
        userBookmarks: [],
        citySights: [],
        showBookmarksFilter: false,
        showingAllSights: false,
        showingCurrentSights: true,
        showingBookmarkedSights: false,
    };
    fetchCitySights = () => {
        fetch(
            `https://frozen-reaches-24867.herokuapp.com/api/sights/${this.context.city}`
        )
            .then((res) => res.json())
            .then((sights) => {
                this.setState({
                    citySights: sights,
                });
            });
    };
    fetchBookmarkedSights = () => {
        fetch(
            `https://frozen-reaches-24867.herokuapp.com/api/bookmarks/${this.context.first_name}`
        )
            .then((res) => res.json())
            .then((bookmarks) => {
                this.setState({
                    userBookmarks: bookmarks,
                });
            });
    };
    handleDeleteBookmarks = (sightid) => {
        fetch(
            `https://frozen-reaches-24867.herokuapp.com/api/bookmarks/${sightid}`,
            {
                method: "DELETE",
            }
        ).then(() => {
            this.fetchBookmarkedSights();
        });
    };
    handleAddBookmarks = (sightid) => {
        const { first_name } = this.context;
        const bookmark = {
            first_name,
            sightid,
        };
        fetch("https://frozen-reaches-24867.herokuapp.com/api/bookmarks/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(bookmark),
        })
            .then((res) => res.json())
            .then((addedbookmark) => {
                this.setState({
                    userBookmarks: [
                        ...this.state.userBookmarks,
                        addedbookmark[0],
                    ],
                });
            });
    };
    handleCitySights = () => {
        if (this.state.showingCurrentSights) {
            if (this.state.citySights.length === 0) {
                return (
                    <div>
                        <div className='no-sights'>
                            <p>
                                Sorry there are currently no sights in your
                                city. You can submit one or check out one of the
                                other sights below
                            </p>
                        </div>
                        <div className='list' id='list'>
                            {this.context.listSights.map((sight) => {
                                return sight.map((x, y) => {
                                    return (
                                        <UserCardList
                                            key={y}
                                            sight={x}
                                            handleAddBookmarks={
                                                this.handleAddBookmarks
                                            }
                                            userBookmarks={
                                                this.state.userBookmarks
                                            }
                                            firstName={this.context.first_name}
                                        />
                                    );
                                });
                            })}
                        </div>
                    </div>
                );
            }
            return (
                <div>
                    <h2 className='current-sights'>
                        Current sights in your city
                    </h2>
                    <div className='list' id='list'>
                        {this.state.citySights.map((sight, x) => {
                            return (
                                <UserCardList
                                    key={x}
                                    sight={sight}
                                    handleAddBookmarks={this.handleAddBookmarks}
                                    userBookmarks={this.state.userBookmarks}
                                    firstName={this.context.first_name}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        } else if (this.state.showingAllSights) {
            return (
                <div>
                    <h2 className='all-sights'>All sights</h2>
                    <div className='list' id='list'>
                        {this.context.listSights.map((sight) => {
                            return sight.map((x, y) => {
                                return (
                                    <UserCardList
                                        key={y}
                                        sight={x}
                                        handleAddBookmarks={
                                            this.handleAddBookmarks
                                        }
                                        userBookmarks={this.state.userBookmarks}
                                        firstName={this.context.first_name}
                                    />
                                );
                            });
                        })}
                    </div>
                </div>
            );
        } else if (this.state.showingBookmarkedSights) {
            if (this.state.userBookmarks.length > 0) {
                return (
                    <div>
                        <h2 className='all-sights'>Your Bookmarks</h2>
                        <div className='list' id='list'>
                            {this.state.userBookmarks.map((bookmarks, y) => (
                                <BookmarkedCards
                                    key={y}
                                    sight={bookmarks}
                                    handleDeleteBookmarks={
                                        this.handleDeleteBookmarks
                                    }
                                />
                            ))}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h2 className='all-sights'>
                            Sorry you have no bookmarks
                        </h2>
                    </div>
                );
            }
        }
    };
    showAllSights = () => {
        this.setState({
            showingAllSights: true,
            showingCurrentSights: false,
            showingBookmarkedSights: false,
        });
    };
    showCurrentSights = () => {
        this.setState({
            showingAllSights: false,
            showingCurrentSights: true,
            showingBookmarkedSights: false,
        });
    };
    showBookmarkedSights = () => {
        console.log("setting bookmarks to true");
        this.setState({
            showingAllSights: false,
            showingCurrentSights: false,
            showingBookmarkedSights: true,
        });
    };
    componentDidMount() {
        this.fetchCitySights();
        this.fetchBookmarkedSights();
        this.setState({
            first_name: this.context.first_name,
            city: this.context.city,
        });
    }
    render() {
        return (
            <div className='user-page'>
                <header>
                    <h1>Welcome, {this.state.first_name}</h1>
                    <h2>from {this.state.city}</h2>
                    <div className='submit-sect'>
                        <span className='logout-link submit-link'>
                            <Link to='/' onClick={this.context.handleLogout}>
                                Logout
                            </Link>
                        </span>
                    </div>
                    <div className='filter'>
                        <button onClick={this.showBookmarkedSights}>
                            Bookmarks
                        </button>
                        <button onClick={this.showAllSights}>All Sights</button>
                        <button onClick={this.showCurrentSights}>
                            Current City
                        </button>
                    </div>
                </header>
                <hr />
                <main>{this.handleCitySights()}</main>
            </div>
        );
    }
}

export default withRouter(UserPage);

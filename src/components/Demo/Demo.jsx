import React, { Component } from "react";
import "../assets/Demo.css";
import { withRouter, Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

class Demo extends Component {
    state = {};
    render() {
        return (
            <div className='demo-page'>
                <h1>How to use my app</h1>
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
                <p>
                    Here is the basis of the app. You are in California, whether
                    you are visiting or living there you may want to find
                    something to do and go see. My app has a big list (soon to
                    be bigger) of a whole bunch of things to do. So, whatever
                    city you are in, you can search up if there are any sites in
                    your city that you have not yet seen.
                </p>
                <h2>
                    If you wanted to <Link to='/signup'>sign up</Link>
                </h2>
                <p>
                    Sign up is fairly simple. All the app needs is your first
                    name, a username, a password, and the city you are in or
                    visiting. Don't worry about accidentally clicking submit,
                    the sign up will always ask you to confirm your inputs.
                </p>
                <h2>When you are signed up</h2>
                <div className='user-page-img'></div>
                <p>
                    As soon as you get to your page, you'll be directed to the
                    'Current City' tab, where you'll be presented with sites
                    within the city you chose. If there are no sights, you can
                    see the rest of the sights in the 'All Sights' tab. In your
                    user page, with all the sights you can bookmark the ones you
                    like. You'll be able to see your bookmarked sights in the
                    bookmark tab.
                </p>
            </div>
        );
    }
}

export default withRouter(Demo);

import React, { Component } from 'react';
import { FaBookmark, FaCheckDouble } from 'react-icons/fa';

class UserCardList extends Component {
    state = {
        isBookmarked: false,
    };
    handleBookmark = () => {
        if (!this.state.isBookmarked) {
            return (
                <button
                    className='bookmark-btn'
                    onClick={() => {
                        this.props.handleAddBookmarks(this.props.sight.id);
                        this.setState({ isBookmarked: true });
                    }}
                >
                    <FaBookmark />
                </button>
            );
        } else {
            return (
                <button className='bookmark-btn'>
                    <FaCheckDouble />
                </button>
            );
        }
    };
    componentDidMount() {
        this.props.userBookmarks.map((bookmarks) => {
            if (bookmarks.id === this.props.sight.id) {
                this.setState({
                    isBookmarked: true,
                });
            }
        });
    }
    render() {
        return (
            <div className='list-card'>
                <div>{this.handleBookmark()}</div>
                <div
                    className='card-img'
                    style={{
                        backgroundImage: `url(${this.props.sight.image})`,
                    }}
                ></div>
                <h2>{this.props.sight.name}</h2>
                <h4>{this.props.sight.city}</h4>
                <p>{this.props.sight.description}</p>
                <span>
                    <a
                        href={this.props.sight.url}
                        target='_blank'
                        rel='noreferrer'
                    >
                        Visit Website
                    </a>
                </span>
            </div>
        );
    }
}

export default UserCardList;

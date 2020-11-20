import React, { Component } from "react";

class UserCardList extends Component {
    render() {
        return (
            <div className='list-card'>
                <div>
                    <button
                        className='bookmark-btn'
                        onClick={() =>
                            this.props.handleAddBookmarks(this.props.sight.id)
                        }
                    >
                        Bookmark this?
                    </button>
                </div>
                <img src={this.props.sight.image} alt={this.props.sight.name} />
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

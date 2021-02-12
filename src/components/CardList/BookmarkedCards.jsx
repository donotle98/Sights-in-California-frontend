import React, { Component } from 'react';
import { FaEyeSlash } from 'react-icons/fa';

class BookmarkedCards extends Component {
    state = {};
    render() {
        return (
            <div className='list-card'>
                <div>
                    <button
                        className='bookmark-btn'
                        onClick={() =>
                            this.props.handleDeleteBookmarks(
                                this.props.sight.id
                            )
                        }
                    >
                        <FaEyeSlash />
                    </button>
                </div>
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

export default BookmarkedCards;

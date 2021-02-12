import React, { Component } from 'react';

class CardList extends Component {
    render() {
        return (
            <div className='list-card'>
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

export default CardList;

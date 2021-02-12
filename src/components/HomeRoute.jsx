import React, { Component } from 'react';
import NavBar from './Navbar/NavBar';
import './assets/HomeRoute.css';
import CardList from './CardList/CardList';
import AppContext from '../store/AppContext';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import icon from './assets/favicon.png';

import _ from 'lodash';

class HomeRoute extends Component {
    static contextType = AppContext;
    state = {
        filterOn: false,
        searchValue: '',
        searchFilter: false,
    };
    handleFilterClick = () => {
        this.setState({
            filterOn: !this.state.filterOn,
        });
    };
    handleSearchBy = (e) => {
        this.setState({
            searchBy: e.target.value,
        });
    };
    handleSearchTerm = (e) => {
        this.setState({
            searchValue: e.target.value,
        });
    };
    handleFilterSearch = (e) => {
        e.preventDefault();
        this.setState({
            searchFilter: true,
        });
    };

    showSights = () => {
        const { listSights } = this.context;
        if (this.state.searchFilter === false) {
            return this.context.listSights.map((sight) => {
                return sight.map((x, y) => {
                    return <CardList key={y} sight={x} />;
                });
            });
        } else {
            const { searchValue } = this.state;
            const finalSearchValue = searchValue.replace(
                /(^\w{1})|(\s+\w{1})/g,
                (letter) => letter.toUpperCase()
            );
            const arr = _.filter(listSights[0], {
                city: finalSearchValue,
            });
            if (!arr.length) {
                return (
                    <div className='filter-error'>
                        <h1>
                            Sorry the city you are looking for currently has no
                            sights
                        </h1>
                    </div>
                );
            }
            return arr.map((sight, y) => {
                return <CardList key={y} sight={sight} />;
            });
        }
    };
    showFilter = () => {
        if (this.state.filterOn) {
            return (
                <div className='filter-form'>
                    <form id='filter'>
                        <div className='search-by'>
                            <input
                                type='text'
                                onChange={this.handleSearchTerm}
                                placeholder='City name'
                                id='city-name'
                                className='form-input'
                            ></input>
                            <label htmlFor='city-name' className='form-label'>
                                City name
                            </label>
                        </div>
                        <div className='filter-controls'>
                            <button
                                className='apply-btn'
                                onClick={(e) => this.handleFilterSearch(e)}
                            >
                                Apply search
                            </button>
                            <button
                                className='clear-btn'
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ searchFilter: false });
                                    this.clearForm();
                                }}
                            >
                                Clear search
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    };
    clearForm = () => {
        document.getElementById('filter').reset();
    };

    render() {
        return (
            <div className='homeroute'>
                <header className='intro-header'>
                    <div className='mobile'>
                        <NavBar />
                    </div>
                    <div className='desktop'>
                        <div className='desk-nav'>
                            <div
                                className='icon'
                                style={{ backgroundImage: `url(${icon})` }}
                            ></div>
                            <ul>
                                <li>
                                    <NavLink to='/login'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/signup'>Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/demo'>Demo</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {' '}
                        <h1 className='welcome'>Welcome to California!</h1>
                        <p className='header-p'>
                            Whether you live here, or you're just visiting,
                            there is always something to do
                        </p>
                        <div className='scroll-down'>
                            <a id='scroll-down' href='#list'>
                                <FaAngleDoubleDown />
                            </a>
                        </div>
                    </div>
                </header>
                <hr />
                <div className='filter-btn' id='list'>
                    <button
                        className='confirm-btn'
                        onClick={this.handleFilterClick}
                    >
                        Search
                    </button>
                </div>
                {this.showFilter()}
                <main className='list'>{this.showSights()}</main>
            </div>
        );
    }
}

export default HomeRoute;

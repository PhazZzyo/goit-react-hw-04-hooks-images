import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PropTypes from 'prop-types';
// import style from './Searchbar.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchRequest: '',
    //   ...INITIAL_STATE,
  };

  handleSearchSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        <ImageGallery searchRequest={this.state.searchRequest} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

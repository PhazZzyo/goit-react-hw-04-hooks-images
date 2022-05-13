import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetchImages from '../services/api';
// import PropTypes from 'prop-types';
// import style from './ImageGallery.module.css';

// const INITIAL_STATE = {
//   searchRequest: '',
//   number: '',
// };

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchRequest;
    const currentSearch = this.props.searchRequest;
    const galleryPage = 1;

    if (prevSearch !== currentSearch) {
      this.setState({ status: 'pending' });
      fetchImages(currentSearch, galleryPage)
        .then(images =>
          this.setState({ images: { ...images }, status: 'resolved' })
        )
        //; console.log(images.hits);
        // if (images.hits.length === 0) {
        //   return toast.error('There is no images found with that search request');
        // }
        // toast
        //   .success(`'Hooray! We found ${images.totalHits} images.'`)
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;
    // const { searchRequest } = this.props;

    if (status === 'idle') {
      return toast.info('Enter search reauest');
    }

    if (status === 'pending') {
      return toast.info('Loading...');
    }

    if (status === 'rejected') {
      return toast.error({ error });
    }

    if (status === 'resolved') {
      return <div>{images && <div>{images}</div>}</div>;
    }
  }
}

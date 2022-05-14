import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { fetchImages } from '../services/fetchImages';
import { Request } from 'components/utils/Request';
// import PropTypes from 'prop-types';
// import style from './ImageGallery.module.css';

// const INITIAL_STATE = {
//   searchRequest: '',
//   number: '',
// };

export default class ImageGallery extends Component {
  state = {
    searchRequest: '',
    galleryPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchRequest;
    const currentSearch = this.props.searchRequest;
    // const galleryPage = 1;

    if (prevSearch !== currentSearch) {
      this.setState({ searchRequest: currentSearch });
      // const imagesArray = fetchImages(currentSearch, galleryPage);

      // fetchImages(currentSearch, galleryPage)
      //   .then(images =>
      //     this.setState({ images: { ...images }, status: 'resolved' })
      //   )
      //   //; console.log(images.hits);
      //   // if (images.hits.length === 0) {
      //   //   return toast.error('There is no images found with that search request');
      //   // }
      //   // toast
      //   //   .success(`'Hooray! We found ${images.totalHits} images.'`)
      //   .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { currentSearch, galleryPage } = this.state;
    // const { searchRequest } = this.props;

    return (
      <Request request={fetchImages(currentSearch, galleryPage)}>
        {({ images, error, loading }) => {
          if (loading) {
            return toast.info('Loading...');
          }

          if (error) {
            return toast.error({ error });
          }

          if (images) {
            return <div>{images && console.log(images)}</div>;
          }
        }}
      </Request>
    );
  }
}

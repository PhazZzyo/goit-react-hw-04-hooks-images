import React, { Component } from 'react';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import { Grid } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PropTypes from 'prop-types';
// import style from './Searchbar.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from 'components/services/fetchImages';

export default class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    galleryPage: 1,
    error: null,
    loading: 'false',
    //   ...INITIAL_STATE,
  };

  async shouldComponentUpdate(nextProps, nextState) {
    const data = await fetchImages(nextState.searchRequest);
    this.setState({ loading: true });
    // if (this.state.images.length === 0) {
    //   return toast.error('There is no images found with that search request');
    // }
    this.setState({ images: data.data.hits });
    ImageGallery(this.state.images);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchRequest;
    const currentSearch = this.props.searchRequest;

    if (prevSearch !== currentSearch) {
      this.setState({ searchRequest: currentSearch });
      fetchImages(this.state.searchRequest, this.state.galleryPage).then(
        images => {
          // if (!images) {
          //   return toast.error(
          //     'There is no images found with that search request'
          //   );
          // }
          return images
            .then(images => {
              this.setState(() => {
                return { images: [...this.state.images, ...images.hits] };
              });
            })
            .catch(error => this.setState({ error }));
        }
      );
    }
  }

  handleSearchSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    const { images, searchRequest } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        <ImageGallery searchRequest={searchRequest} />
        {images.length !== 0 && <ImageGallery images={images} />}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

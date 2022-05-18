import React, { Component } from 'react';
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
    status: null,
    images: [],
    galleryPage: 1,
    error: null,
    loading: 'false',
    //   ...INITIAL_STATE,
  };

  async shouldComponentUpdate(nextProps, nextState) {
    const data = await fetchImages(nextState.searchRequest);
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
          if (images.ok) {
            return images.json();
          }
          return Promise.reject(
            toast.error('There is no images found with that search request')
          )
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

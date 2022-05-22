import React, { Component } from 'react';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import { Grid } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import { Modal } from './ImageGallery/Modal/Modal';
import Button from './Button/Button';
import { fetchImages } from 'components/services/fetchImages';

export default class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    galleryPage: 1,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchRequest;
    const currentSearch = this.state.searchRequest;
    const prevGalleryPage = prevState.galleryPage;
    const currentGalleryPage = this.state.galleryPage;
    console.log(this.state.isLoading);

    if (
      prevSearch !== currentSearch ||
      prevGalleryPage !== currentGalleryPage
    ) {
      this.updateImages();
    }
  }

  updateImages() {
    const { searchRequest, galleryPage } = this.state;
    this.setState({ isLoading: true });

    try {
      fetchImages(searchRequest, galleryPage).then(data => {
        if (!data.data.hits.length) {
          return toast.error(
            'There is no images found with that search request'
          );
        }
        this.setState({
          images: [...this.state.images, ...data.data.hits],
        });
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearchSubmit = searchRequest => {
    this.setState({
      searchRequest,
      images: [],
      galleryPage: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {/* {images.length !== 0 && <ImageGallery images={images} />} */}
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
        {/* {toast.error('There is no images found with that search request')} */}
        {isLoading && <p>Loading...</p>}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            <Button loadMore={this.loadMore} />
          </>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

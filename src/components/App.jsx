import React, { Component } from 'react';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import { Grid } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PropTypes from 'prop-types';
// import style from './Searchbar.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { fetchImages } from 'components/services/fetchImages';

export default class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    galleryPage: false,
    moreButton: false,
    error: null,
    isLoading: 'false',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchRequest;
    const currentSearch = this.props.searchRequest;

    if (prevSearch !== currentSearch) {
      this.setState({ searchRequest: currentSearch });
      this.updateImages();
    }
  }

  async updateImages() {
    const { searchRequest, galleryPage } = this.state;

    this.setState({ isLoading: true });

    try {
      const data = await fetchImages(searchRequest, galleryPage);
      console.log(data);
      this.setState({ images: [...this.state.images, ...data.hits] });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // if (this.state.images.length === 0) {
  //   return toast.error('There is no images found with that search request');
  // }

  // ImageGallery(this.state.images);
  // }

  // componentDidMount(prevProps, prevState) {
  //   const prevSearch = prevProps.searchRequest;
  //   const currentSearch = this.props.searchRequest;
  //   // const { searchRequest, galleryPage } = this.state;

  //   if (prevSearch !== currentSearch) {
  //     this.setState({ searchRequest: currentSearch });
  //     // fetchImages(this.state.searchRequest, this.state.galleryPage)
  // .then(images => {
  //   if (!images.hits) {
  //     return toast.error(
  //       'There is no images found with that search request'
  //     );
  //   }
  //   this.setState(() => {
  //     return { images: [...this.state.images, ...images.hits] };
  //   });
  //     //   })
  //     //   .catch(error => this.setState({ error }));
  //   }
  // }

  handleSearchSubmit = searchRequest => {
    this.setState({
      searchRequest,
      images: [],
      galleryPage: 1,
      moreButton: 'loading',
    });
  };

  loadMore = () => {
    setTimeout(() => {
      this.setState(prevState => ({
        page: prevState.page + 1,
        moreButton: 'loading',
      }));
    }, 500);
  };

  render() {
    const { images, isLoading, error, loadMore } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {/* <ImageGallery searchRequest={searchRequest} /> */}
        {/* {images.length !== 0 && <ImageGallery images={images} />} */}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {images.length > 0 ? (
          toast.error('There is no images found with that search request')
        ) : (
          <ImageGallery images={images} />
        )}
        {loadMore === true && <Button loadMore={this.loadMore} />}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

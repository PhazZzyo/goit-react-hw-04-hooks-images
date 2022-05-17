import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'components/services/fetchImages';
// import { Request } from 'components/utils/Request';
// import { fetchImages } from '../services/fetchImages';
// import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

// const INITIAL_STATE = {
//   searchRequest: '',
//   number: '',
// };

export default class Searchbar extends Component {
  state = {
    searchRequest: '',
    status: null,
    images: [],
    galleryPage: 1,
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
    }
  }

  handleRequestChange = event => {
    this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchRequest.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    this.props.onSearch(this.state.searchRequest);
    this.setState({ searchRequest: '' });
    // fetchImages(this.state.searchRequest, this.state.galleryPage)
    //   .then(({ data }) => {
    //     ImageGallery(data.hits);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchForm_button}>
            <span className={style.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={style.SearchForm_input}
            type="text"
            name="searchRequest"
            value={this.state.searchRequest}
            onChange={this.handleRequestChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

//   <Request request={fetchImages(currentSearch, galleryPage)}>
//     {({ images, error, loading }) => {
//       if (loading) {
//         return toast.info('Loading...');
//       }

//       if (error) {
//         return toast.error({ error });
//       }

//       if (images) {
//         return <div>{images && console.log(images)}</div>;
//       }
//     }}

// );

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

// fetchImages(this.state.searchRequest, this.state.galleryPage).then(
//   images => this.setState({ images: { ...images }, status: 'resolved' }),
//   ImageGallery(this.state.images)
// );
// console.log(this.state.images.hits);
// if (this.state.images.hits.length === 0) {
//   return toast.error('There is no images found with that search request');
// }
// toast
//   .success(`'Hooray! We found ${this.state.images.totalHits} images.'`)
//   .catch(error => this.setState({ error, status: 'rejected' }));

// static propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

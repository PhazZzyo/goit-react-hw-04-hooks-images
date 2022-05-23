import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';

const ImageGallery = ({ images, handlePreview }) => {
  const renderGallery = () =>
    images.map(({ id, largeImageURL, webformatURL, tags }) => (
      <ImageGalleryItem
        className={style.ImageGalleryItem}
        key={id}
        tags={tags}
        lgImage={largeImageURL}
        smImage={webformatURL}
        // handlePreview={handlePreview}
        onClick={() => handlePreview(id)}
      />
    ));

  return (
    <div>
      <ul className={style.ImageGallery}>{images ? renderGallery() : null}</ul>
    </div>
  );
};

ImageGallery.propTypes = {
  handlePreview: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;

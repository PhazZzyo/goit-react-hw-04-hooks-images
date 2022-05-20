import ImageGalleryItem from './ImageGalleryItem';

// import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  const renderGallery = () =>
    images.map(({ id, largeImageURL, webformatURL, tags }) => (
      <ImageGalleryItem
        className={style.ImageGalleryItem}
        key={id}
        tags={tags}
        lgImage={largeImageURL}
        smImage={webformatURL}
        // handlePreview={handlePreview}
      />
    ));

  return (
    <div>
      <ul className={style.ImageGallery}>{images ? renderGallery() : null}</ul>
    </div>
  );
};

// ImageGallery.propTypes = {
//   handlePreview: PropTypes.func.isRequired,
//   list: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       tags: PropTypes.string.isRequired,
//     })
//   ),
// };

export default ImageGallery;

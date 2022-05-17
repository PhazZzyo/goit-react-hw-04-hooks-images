// import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smImage, lgImage, handlePreview }) => {
  return (
    <li className={style.GalleryItem}>
      <img src={smImage} alt="" />
    </li>
  );
};

// const Item = styled.li`
//   margin-top: 10px;
//   margin-left: 10px;
//   width: 150px;
//   height: 93px;
//   transform: scale(1);
//   transition: transform 250ms ease-in-out;
//   &:hover {
//     cursor: pointer;
//     transform: scale(1.1);
//   }
// `;

// const Image = styled.div`
//   width: 100%;
//   height: 100%;
//   background-position: center;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-color: #eee;
//   background-image: url(${p => p.image});
// `;

// ImageGalleryItem.propTypes = {
//   handlePreview: PropTypes.func.isRequired,
//   lgImage: PropTypes.string.isRequired,
//   smImage: PropTypes.string.isRequired,
// };

export default ImageGalleryItem;

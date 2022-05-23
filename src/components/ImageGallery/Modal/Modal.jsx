import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    smImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = element => {
    if (element.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { smImage, tags } = this.props;
    return (
      <div className={style.Overlay} onClick={this.handleBackdropClick}>
        <div className={style.Modal}>
          <img src={smImage} alt={tags} />
        </div>
      </div>
    );
  }
}

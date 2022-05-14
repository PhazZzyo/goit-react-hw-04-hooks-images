import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Request extends PureComponent {
  state = {
    images: null,
    error: null,
    loading: 'false',
  };

  async componentDidMount() {
    const { request } = this.props;
    this.setState({ loading: true });

    try {
      const images = await request();
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { children } = this.props;
    const { images, error, loading } = this.state;

    return <>{children({ images, error, loading })}</>;
  }
}

Request.propTypes = {
  request: PropTypes.func,
};

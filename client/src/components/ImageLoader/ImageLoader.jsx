import { LoadingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../src/App.css';

const ImageLoader = ({ src, alt }) => {
  const loadedImages = {};
  const [loaded, setLoaded] = useState(loadedImages[src]);

  const onLoad = () => {
    loadedImages[src] = true;
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <LoadingOutlined style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto',
        }}
        />
      )}
      <img
        alt={alt || ''}
        className='collection-images'
        onLoad={onLoad}
        src={src}
      />
    </>
  );
};

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired, // Make sure 'src' is a required string
  alt: PropTypes.string, // 'alt' is an optional string
};

ImageLoader.defaultProps = {
  className: 'image-loader',
};

export default ImageLoader;

import { LoadingOutlined } from '@ant-design/icons';
// import PropType from 'prop-types';
import React, { useState } from 'react';

import '../../src/App.css'



const ImageLoader = ({ src, alt, className }) => {
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
          position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto'
        }}
        />
      )}
      <img
        alt={alt || ''}
        // className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        className='collection-images'
        onLoad={onLoad}
        src={src}
        // style={{width:"100px"}}
        // style={{height:"100px"}}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  className: 'image-loader'
};

// ImageLoader.propTypes = {
//   // src: PropType.string.isRequired,
//   // alt: PropType.string.isRequired,
//   alt: PropType.string,
//   className: PropType.string
// };

export default ImageLoader;

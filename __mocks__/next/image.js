import * as React from 'react';
const NextImage = ({ src, alt, ...props }) => {
  return React.createElement('img', {
    src: typeof src === 'string' ? src : src?.src,
    alt,
    ...props,
  });
};

export default NextImage;

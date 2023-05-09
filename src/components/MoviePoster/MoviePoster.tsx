import React from 'react';
import { ConfigContext } from '../../context/ConfigApiContext';

function MoviePosterURL(poster_path: string | null | undefined, size: number) {
  const config = React.useContext(ConfigContext);
  const images = config?.images;

  const getImageUrl = () => {
    let strSize: string = size.toString();
    if (strSize === '9999') strSize = 'original;';
    if (strSize !== '9999') strSize = `w${strSize}`;
    if (
      images?.secure_base_url &&
      images?.logo_sizes.includes(strSize) &&
      poster_path
    ) {
      return `${images?.secure_base_url}w${size}${poster_path}`;
    }
    return `http://via.placeholder.com/${size.toString()}`;
  };

  return getImageUrl();
}

export default MoviePosterURL;

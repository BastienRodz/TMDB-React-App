import React, { useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigApiContext';
import bigPoster from '../../assets/no-poster-big.png';
import smallPoster from '../../assets/no-poster-small.png';

interface MoviePosterProps {
  poster_path: string | null | undefined;
  size: number;
}

// This component is used to display the poster of a movie.
// The path of the poster is provided by TheMovieDB API and is used to get the right poster.
// The size is used to get the right size of the poster through TheMovieDB API.
// If no poster path is provided, it displays a default image.
function MoviePoster({ poster_path, size }: MoviePosterProps) {
  const config = useContext(ConfigContext);
  const images = config?.images;

  const getImageUrl = () => {
    const strSize = `w${size.toString()}`;
    if (
      images?.secure_base_url &&
      images?.logo_sizes.includes(strSize) &&
      poster_path
    ) {
      return `${images?.secure_base_url}w${size}${poster_path}`;
    }
    if (size > 100) return bigPoster;
    return smallPoster;
  };

  return <img src={getImageUrl()} alt="" />;
}

export default MoviePoster;

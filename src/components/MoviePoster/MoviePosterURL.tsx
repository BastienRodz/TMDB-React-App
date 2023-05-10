import { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigApiContext';
import bigPoster from '../../assets/no-poster-big.png';
import smallPoster from '../../assets/no-poster-small.png';

interface MoviePosterURLProps {
  poster_path: string | null | undefined;
  size: number;
}

// The size is used to get the right size of the poster through TheMovieDB API.
// If no poster path is provided, it displays a default image.
function MoviePosterURL({ poster_path, size }: MoviePosterURLProps) {
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

  return getImageUrl();
}

export default MoviePosterURL;

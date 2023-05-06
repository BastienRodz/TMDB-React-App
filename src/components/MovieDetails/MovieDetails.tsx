import React, { useEffect } from 'react';
// import { ConfigContext } from '../../context/ConfigApiContext';
import { MovieContext } from '../../context/MovieContext';
import { detailedMovie } from '../../types.d';

function MovieDetails() {
  // const config = React.useContext(ConfigContext);
  const { selectedMovie } = React.useContext(MovieContext);
  const [movieDetailed, setMovieDetailed] = React.useState<detailedMovie>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie?.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
      );
      const data: detailedMovie = await response.json();
      setMovieDetailed(data);
    };
    fetchMovieDetails();
  }, [selectedMovie]);

  if (!selectedMovie) {
    return null;
  }
  return <div>{movieDetailed?.title}</div>;
}

export default MovieDetails;

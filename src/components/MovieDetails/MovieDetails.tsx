import React, { useEffect } from 'react';
import './MovieDetails.css';
import { detailedMovie } from '../../types.d';
import MoviePoster from '../MoviePoster/MoviePoster';
import { MovieContext } from '../../context/MovieContext';
import { LanguageContext } from '../../context/LanguageContext';

function MovieDetails() {
  const { selectedMovie } = React.useContext(MovieContext);
  const [movieDetailed, setMovieDetailed] = React.useState<detailedMovie>();
  const { language } = React.useContext(LanguageContext);

  const movieOverview = (movieItem: detailedMovie | undefined) => {
    if (!movieItem) return null;
    const { overview } = movieItem;
    if (!overview) return 'No overview available';
    return overview;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!selectedMovie) return;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie?.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
      );
      const data: detailedMovie = await response.json();
      setMovieDetailed(data);
    };
    fetchMovieDetails();
  }, [selectedMovie, language]);

  if (!selectedMovie) {
    return null;
  }
  return (
    <>
      <div className="top-container">
        <div className="movie-title">{movieDetailed?.title}</div>
        <div className="movie-poster">
          <img
            src={MoviePoster(movieDetailed?.poster_path, 500)}
            alt={movieDetailed?.title}
          />
        </div>
      </div>
      <div className="down-container">
        <div className="movie-overview">{movieOverview(movieDetailed)}</div>
      </div>
    </>
  );
}

export default MovieDetails;

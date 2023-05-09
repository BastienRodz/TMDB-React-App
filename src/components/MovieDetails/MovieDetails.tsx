import React, { useEffect } from 'react';
import './MovieDetails.css';
import { detailedMovie, Genre } from '../../types.d';
import MoviePoster from '../MoviePoster/MoviePoster';
import MovieScores from '../MovieScores/MovieScores';
import MovieTrailer from '../MovieTrailer/MovieTrailer';
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
  const bg_img = MoviePoster(movieDetailed?.backdrop_path, 300);

  const getRuntime = (runtime: number | null | undefined) => {
    if (!runtime) return null;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  const getGenres = (genres: Genre[] | undefined) => {
    if (!genres) return language === 'en-US' ? 'Unknown' : 'Inconnu';
    return genres.map((genre) => genre.name).join(', ');
  };

  return (
    <div
      style={{
        background: `url(${bg_img}) center center / cover no-repeat`,
        height: '100%',
      }}
    >
      <div className="top-container">
        <div className="top-box">
          <h1>{movieDetailed?.title}</h1>
          <span className="movie-others">
            {MovieScores({ movie: selectedMovie })}
          </span>
        </div>
        <div className="movie-poster">
          <img
            src={MoviePoster(movieDetailed?.poster_path, 500)}
            alt={movieDetailed?.title}
          />
        </div>
      </div>
      <div className="down-container">
        <div className="down-box">
          <span>{getRuntime(movieDetailed?.runtime)}</span>
          <span>Genre(s): {getGenres(movieDetailed?.genres)}</span>
          <span>Status: {movieDetailed?.status}</span>
          <span>{MovieTrailer(movieDetailed, language)}</span>
        </div>
        <div className="down-box">
          <div className="movie-overview">{movieOverview(movieDetailed)}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

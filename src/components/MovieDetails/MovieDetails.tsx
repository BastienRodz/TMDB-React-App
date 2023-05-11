import { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './MovieDetails.css';
import { detailedMovie, Genre } from '../../types.d';
import MoviePoster from '../MoviePoster/MoviePoster';
import MovieScores from '../MovieScores/MovieScores';
import MovieTrailer from '../MovieTrailer/MovieTrailer';
import MovieOverview from '../MovieOverview/MovieOverview';
import DefaultPage from '../DefaultPage/DefaultPage';
import { MovieContext } from '../../contexts/MovieContext';
import { LocalContext } from '../../contexts/LocalContext';
import i18n from '../../utils/i18n';

// This component displays the details of a movie on the right side of the website.
// It access the context to get the selected movie and the local.
function MovieDetails() {
  const { selectedMovie } = useContext(MovieContext);
  const [movieDetailed, setMovieDetailed] = useState<detailedMovie>();
  const { local } = useContext(LocalContext);
  const { t } = useTranslation();

  // Fetch the movie details, using the selected local and the selected movie ID.
  // If the selected movie is undefined, we don't fetch anything.
  // If local or selectedMovie change, we fetch again.
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!selectedMovie) return;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie?.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${local}`
      );
      const data: detailedMovie = await response.json();
      setMovieDetailed(data);
    };
    fetchMovieDetails();
  }, [selectedMovie, local]);

  // If the user changes the local, we change the local of the text displayed through i18n.
  useEffect(() => {
    i18n.changeLanguage(local);
  }, [local]);

  // If no movie are selected, we display the default page.
  if (!selectedMovie) {
    return <DefaultPage />;
  }

  // The next functions are used to get and display the details from the fetched movie data structure.
  const getRuntime = (runtime: number | null | undefined) => {
    if (!runtime) return null;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  const getGenres = (genres: Genre[] | undefined) => {
    if (!genres) return t('status.unknown');
    if (genres.length === 0) return t('status.unknown');
    return genres.map((genre) => genre.name).join(', ');
  };

  const getStatus = (status: string | undefined) => {
    if (!status) return t('status.unknown');
    return t(`${status}`);
  };

  return (
    <>
      <div className="top-container">
        <div className="top-box">
          <h1>{movieDetailed?.title}</h1>
          <span className="movie-others">
            <MovieScores movie={selectedMovie} />
          </span>
        </div>
        <div className="movie-poster">
          <MoviePoster poster_path={movieDetailed?.poster_path} size={500} />
        </div>
      </div>
      <div className="down-container">
        <div className="up-box">
          <ul>
            <li>{getRuntime(movieDetailed?.runtime)}</li>
            <li>
              <b>Genre(s):</b> {getGenres(movieDetailed?.genres)}
            </li>
            <li>
              <b>Status:</b> {getStatus(movieDetailed?.status)}
            </li>
          </ul>
          <MovieTrailer movie={movieDetailed} />
        </div>
        <div className="down-box">
          <div className="movie-overview">
            <MovieOverview movie={movieDetailed} language={local} size={2000} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;

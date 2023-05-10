import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Movie, detailedMovie } from '../../types.d';
import i18n from '../../utils/i18n';

type MovieOverviewProps = {
  movie: Movie | detailedMovie | undefined;
  language: string;
  size: number;
};

// This component displays the overview of a movie.
// If the overview is too long, it is cut and "..." is added at the end.
// If the overview does not exist, a message is displayed.
function MovieOverview({ movie, language, size }: MovieOverviewProps) {
  const [movieOverview, setMovieOverview] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // Fetch the movie overview, using the selected language and the selected movie ID.
  // If the selected movie is undefined, we don't fetch anything.
  // If language or selectedMovie change, we fetch again.
  // If the "local" is not found, we try to fetch the overview in the main "language".
  // Example : if the user selected "fr-CA" and the overview is empty, we try to fetch the overview in "fr".
  useEffect(() => {
    const fetchMovieOverview = async () => {
      if (!movie) {
        setMovieOverview('');
        return;
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
      );
      const data: detailedMovie = await response.json();

      if (data.overview) {
        setMovieOverview(data.overview);
      } else {
        const fallbackResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=${language.substring(0, 2)}`
        );
        const fallbackData: detailedMovie = await fallbackResponse.json();
        setMovieOverview(
          fallbackData.overview || t<string>('overview.no_overview')
        );
      }
    };
    fetchMovieOverview();
  }, [movie, language, t]);

  if (movieOverview.length > size)
    return <p>{`${movieOverview.slice(0, size)}...`}</p>;
  return <p>{movieOverview}</p>;
}

export default MovieOverview;

import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { detailedMovie } from '../../types.d';
import i18n from '../../utils/i18n';
import { LocalContext } from '../../contexts/LocalContext';

interface MovieTrailerProps {
  movie: detailedMovie | undefined;
}

// This component displays the trailer of a movie on the right side of the website.
function MovieTrailer({ movie }: MovieTrailerProps) {
  const [trailerURL, setTrailerURL] = useState<string | null>(null);
  const { t } = useTranslation();
  const { local } = useContext(LocalContext);

  // Fetch the trailer of the movie, using the selected local and the selected movie ID.
  // If the selected movie is undefined, we don't fetch anything.
  // If local or selectedMovie change, we fetch again.
  useEffect(() => {
    const getTrailer = async (movieToCheck: detailedMovie | undefined) => {
      if (!movieToCheck) return;
      const { id } = movieToCheck;

      // First, try to fetch the trailer in the user-selected local.
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${local}`
      );
      const data = await response.json();

      let trailer;

      if (data.results.length !== 0) {
        trailer = data.results.find(
          (videoData: { type: string }) => videoData.type === 'Trailer'
        );
      }

      // If no trailer is found in the user-selected local, we try the original language of the movie.
      if (!trailer) {
        const originalResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${movieToCheck.original_language}`
        );
        const originalData = await originalResponse.json();

        if (originalData.results.length !== 0) {
          trailer = originalData.results.find(
            (videoData: { type: string }) => videoData.type === 'Trailer'
          );
        }
      }

      // If a trailer is found, set the trailer URL
      if (trailer) {
        setTrailerURL(
          `https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&origin=http://localhost:3000`
        );
      } else {
        setTrailerURL(null);
      }
    };

    getTrailer(movie);
  }, [movie, local]);

  // If the user changes the language, we change the language of the text displayed through i18n.
  useEffect(() => {
    i18n.changeLanguage(local);
  }, [local]);

  return (
    <div className="trailer">
      {trailerURL ? (
        <iframe
          title="trailer"
          width="100%"
          height="100%"
          src={trailerURL}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>{t('trailer.unavailable')}</p>
      )}
    </div>
  );
}

export default MovieTrailer;

import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { detailedMovie } from '../../types.d';
import i18n from '../../utils/i18n';
import { LanguageContext } from '../../context/LanguageContext';

interface MovieTrailerProps {
  movie: detailedMovie | undefined;
}

// This component displays the trailer of a movie on the right side of the website.
function MovieTrailer({ movie }: MovieTrailerProps) {
  const [trailerURL, setTrailerURL] = useState<string | null>(null);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  // Fetch the trailer of the movie, using the selected language and the selected movie ID.
  // If the selected movie is undefined, we don't fetch anything.
  // If language or selectedMovie change, we fetch again.
  useEffect(() => {
    const getTrailer = async (movieToCheck: detailedMovie | undefined) => {
      if (!movieToCheck) return;
      const { id } = movieToCheck;

      // First, try to fetch the trailer in the user-selected language
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
      );
      const data = await response.json();

      let trailer;

      if (data.results.length !== 0) {
        trailer = data.results.find(
          (videoData: { type: string }) => videoData.type === 'Trailer'
        );
      }

      // If no trailer is found in the user-selected language, try the original language of the movie.
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
        setTrailerURL(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerURL(null);
      }
    };

    getTrailer(movie);
  }, [movie, language]);

  // If the user changes the language, we change the language of the text displayed through i18n.
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="trailer">
      {trailerURL ? (
        <iframe title="trailer" width="100%" height="100%" src={trailerURL} />
      ) : (
        <p>{t('trailer.unavailable')}</p>
      )}
    </div>
  );
}

export default MovieTrailer;

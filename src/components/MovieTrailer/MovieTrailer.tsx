import React, { useState, useEffect } from 'react';
import './MovieTrailer.css';
import { detailedMovie } from '../../types.d';

function MovieTrailer(movie: detailedMovie | undefined, language: string) {
  const [trailerURL, setTrailerURL] = useState<string | null>(null);

  useEffect(() => {
    const getTrailer = async (movieToCheck: detailedMovie | undefined) => {
      if (!movieToCheck) return;
      const { id } = movieToCheck;

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setTrailerURL(null);
        return;
      }

      const trailer = data.results.find(
        (videoData: { type: string }) => videoData.type === 'Trailer'
      );
      if (!trailer) {
        setTrailerURL(null);
        return;
      }
      setTrailerURL(`https://www.youtube.com/embed/${trailer.key}`);
    };

    getTrailer(movie);
  }, [movie, language]);

  return (
    <div className="trailer">
      {trailerURL ? (
        <iframe title="trailer" width="100%" height="100%" src={trailerURL} />
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
}

export default MovieTrailer;

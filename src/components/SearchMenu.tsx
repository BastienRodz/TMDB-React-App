import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';
import './SearchMenu.css'; // Import the styles
import { Movie } from '../types.d';
import { useConfig } from '../context/ConfigApiContext';

interface SearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const page = 1;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isBottomBlurVisible, setIsBottomBlurVisible] = useState(false);
  const movieListRef = useRef<HTMLDivElement | null>(null);
  const [isTopBlurVisible, setIsTopBlurVisible] = useState(false);

  const config = useConfig(); // Use useConfig hook

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchMovies = async () => {
        const response = await fetch(
          `${BASE_URL}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&query=${debouncedSearchTerm}&page=${page}&include_adult=true`
        );
        const data: SearchResult = await response.json();
        setSearchResults(data.results);
      };
      fetchMovies();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, page]);

  function handleScroll(e: React.UIEvent<HTMLDivElement>): void {
    const target = e.target as HTMLDivElement;
    const isAtBottom =
      Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
    const isAtTop = target.scrollTop === 0;
    setIsBottomBlurVisible(!isAtBottom);
    setIsTopBlurVisible(!isAtTop);
  }

  useEffect(() => {
    if (movieListRef.current) {
      handleScroll({
        target: movieListRef.current,
      } as unknown as React.UIEvent<HTMLDivElement>);
    }
  }, [searchResults]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
  }

  const images = config?.images; // Use config

  const movieDate = (movieItem: Movie) => {
    const date = new Date(movieItem.release_date).getFullYear();
    const str = `${date.toString()} `;
    return str;
  };

  const movieRating = (movieItem: Movie) => {
    const { vote_average, vote_count } = movieItem;
    if (vote_count >= 100) return `- 🌟${vote_average.toFixed(1).toString()}`;
    return null;
  };

  const movieClassification = (movieItem: Movie) => {
    const { adult } = movieItem;
    if (adult) return ' - 🔞';
    return null;
  };

  const movieOverview = (movieItem: Movie) => {
    const { overview } = movieItem;
    if (!overview) return 'No overview available';
    if (overview.length > 140) return `${overview.substring(0, 140)}...`;
    return overview;
  };

  const getImageUrl = (posterPath: string) => {
    if (
      images.secure_base_url &&
      images.logo_sizes.includes('w92') &&
      posterPath
    ) {
      return `${images.secure_base_url}w92${posterPath}`;
    }
    return 'http://via.placeholder.com/92';
  };

  return (
    <div className="search-menu">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        placeholder="Search for a movie..."
      />
      <div ref={movieListRef} className="movie-list" onScroll={handleScroll}>
        {isTopBlurVisible && (
          <div className="movie-list-top-blur">
            <i className="up-arrow" />
          </div>
        )}
        {isBottomBlurVisible && (
          <div className="movie-list-bottom-blur">
            <i className="down-arrow" />
          </div>
        )}
        {searchResults.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="movie-item-image">
              <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>
                {movieDate(movie)}
                {movieRating(movie)}
                {movieClassification(movie)}
              </p>
              <p>
                <span className="movie-info-label">
                  Overview: {movieOverview(movie)}
                </span>{' '}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMenu;

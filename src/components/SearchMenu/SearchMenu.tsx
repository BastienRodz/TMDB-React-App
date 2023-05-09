import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import './SearchMenu.css';
import { Movie } from '../../types.d';
import useDebounce from '../../hooks/useDebounce';
import MoviePoster from '../MoviePoster/MoviePoster';
import MovieScores from '../MovieScores/MovieScores';
import { useMovie } from '../../context/MovieContext';
import { LanguageContext } from '../../context/LanguageContext';

interface SearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const page = 1;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isBottomBlurVisible, setIsBottomBlurVisible] = useState(false);
  const movieListRef = useRef<HTMLDivElement | null>(null);
  const [isTopBlurVisible, setIsTopBlurVisible] = useState(false);
  const { setSelectedMovie } = useMovie();
  const { language } = useContext(LanguageContext);
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchMovies = async () => {
        const response = await fetch(
          `${BASE_URL}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&query=${debouncedSearchTerm}&page=${page}&include_adult=true`
        );
        const data: SearchResult = await response.json();
        setSearchResults(data.results);
      };
      fetchMovies();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, page, language]);

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

  const movieOverview = (movieItem: Movie) => {
    const { overview } = movieItem;
    if (!overview) return 'No overview available';
    if (overview.length > 140) return `${overview.substring(0, 140)}...`;
    return overview;
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
          <button
            type="button"
            key={movie.id}
            className="movie-item"
            onClick={() => {
              setSelectedMovie(movie);
            }}
          >
            <div className="movie-item-image">
              <img src={MoviePoster(movie.poster_path, 92)} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span className="movie-others">{MovieScores({ movie })}</span>
              <p>
                <span className="movie-info-label">{movieOverview(movie)}</span>{' '}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchMenu;

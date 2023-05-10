import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import './SearchMenu.css';
import { Movie } from '../../types.d';
import useDebounce from '../../hooks/useDebounce';
import MoviePosterURL from '../MoviePoster/MoviePosterURL';
import MovieScores from '../MovieScores/MovieScores';
import MovieOverview from '../MovieOverview/MovieOverview';
import SearchPrompt from '../SearchPrompt/SearchPrompt';
import { useMovie } from '../../context/MovieContext';
import { LanguageContext } from '../../context/LanguageContext';
import i18n from '../../utils/i18n';

// This interface is used to type the data fetched from TheMovieDB API.
interface SearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

// This component displays the search menu on the left side of the website.
// It is composed of a search bar and a list of movies.
function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const movieListRef = useRef<HTMLDivElement | null>(null);
  const [isBottomBlurVisible, setIsBottomBlurVisible] =
    useState<boolean>(false);
  const [isTopBlurVisible, setIsTopBlurVisible] = useState<boolean>(false);
  const { setSelectedMovie } = useMovie();

  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const page = 1;

  // Fetch the movies, using the selected language and the search term.
  // If the search term is empty, we don't fetch anything.
  // If language or search term change, we fetch again.
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

  // This function is called when the user scrolls the movie list.
  // It checks if the user is at the top or at the bottom of the list to display the blur effect correctly.
  function handleScroll(e: React.UIEvent<HTMLDivElement>): void {
    const target = e.target as HTMLDivElement;
    const isAtBottom =
      Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
    const isAtTop = target.scrollTop === 0;
    setIsBottomBlurVisible(!isAtBottom);
    setIsTopBlurVisible(!isAtTop);
  }

  // This effect is used to scroll the movie list to the top when the search term or the language changes.
  useEffect(() => {
    if (movieListRef.current) {
      handleScroll({
        target: movieListRef.current,
      } as unknown as React.UIEvent<HTMLDivElement>);
    }
  }, [searchResults, language]);

  // This function is called when the user types in the search bar.
  // It updates the search term.
  function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
  }

  // If the user changes the language, we change the language of the text displayed through i18n.
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="search-menu">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        placeholder={t('search.input', 'Search for a movie...') as string}
        aria-label="Search for a movie"
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
        {searchTerm ? (
          searchResults.map((movie) => {
            const movieOverview = (
              <MovieOverview movie={movie} language={language} size={140} />
            );

            return (
              <button
                type="button"
                key={movie.id}
                className="movie-item"
                onClick={() => {
                  setSelectedMovie(movie);
                }}
              >
                <div className="movie-item-image">
                  <img
                    src={MoviePosterURL({
                      poster_path: movie?.poster_path,
                      size: 92,
                    })}
                    alt={movie?.title}
                  />
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <span className="movie-others">{MovieScores({ movie })}</span>
                  <span className="movie-info-label">{movieOverview}</span>
                </div>
              </button>
            );
          })
        ) : (
          <SearchPrompt language={language} />
        )}
      </div>
    </div>
  );
}

export default SearchMenu;

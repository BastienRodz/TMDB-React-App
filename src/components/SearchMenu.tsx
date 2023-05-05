import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';
import './SearchMenu.css'; // Import the styles
import { Movie } from '../types.d';

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
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchMovies = async () => {
        const response = await fetch(
          `${BASE_URL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${debouncedSearchTerm}&page=${page}&include_adult=false`
        );
        const data: SearchResult = await response.json();
        console.log('API response data:', data); // Add this line to log the data
        setSearchResults(data.results);
      };
      fetchMovies();
      console.log(searchResults);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, page]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="search-menu">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        placeholder="Search for a movie..."
      />
      <div className="movie-list">
        {searchResults.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <p>Release date: {movie.release_date}</p>
          </div>
        ))}
        <div ref={loader} className="loader" />
      </div>
    </div>
  );
}

export default SearchMenu;

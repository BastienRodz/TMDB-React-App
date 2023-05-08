import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import LanguageSelection from './components/LanguageSelection/LanguageSelection';
import SearchMenu from './components/SearchMenu/SearchMenu';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { MovieContext } from './context/MovieContext';

function App() {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const [showDetails, setShowDetails] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleBackButtonClick = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  const handleMovieClick = () => {
    setShowDetails(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <div
        className={`left-container ${
          showDetails && windowWidth <= 800 ? 'hidden' : ''
        }`}
      >
        <div className="left-header">
          <img className="left-logo" src={logo} alt="logo" />
          <h1>Fresh Tomatoes</h1>
          <LanguageSelection />
        </div>
        <div className="left-search">
          <SearchMenu onMovieClick={handleMovieClick} />
        </div>
      </div>
      {selectedMovie && (
        <div
          className={`right-container ${showDetails ? 'visible' : 'hidden'}`}
        >
          <button
            type="button"
            className="back-button"
            onClick={handleBackButtonClick}
          >
            &#8592; Back
          </button>
          <MovieDetails />
        </div>
      )}
    </div>
  );
}

export default App;

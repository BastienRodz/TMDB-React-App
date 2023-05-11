import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import LocalSelection from './components/LocalSelection/LocalSelection';
import SearchMenu from './components/SearchMenu/SearchMenu';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { MovieContext } from './contexts/MovieContext';

// The App component serves as the main container for the entire application
function App() {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleBackButtonClick = () => {
    setSelectedMovie(null);
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
    <div className="App animated-background">
      <div className={`left-container ${windowWidth <= 1000 ? 'hidden' : ''}`}>
        <div className="left-header">
          <img className="left-logo" src={logo} alt="logo" />
          <h1>Fresh Tomatoes</h1>
          <LocalSelection />
        </div>
        <div className="left-search">
          <SearchMenu />
        </div>
      </div>
      {(windowWidth > 1000 || selectedMovie) && (
        <div className="right-container animated-background">
          {selectedMovie && (
            <button
              type="button"
              className="back-button"
              onClick={handleBackButtonClick}
            >
              &larr;
            </button>
          )}
          <MovieDetails />
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import './App.css';
import logo from './assets/logo.png';
import SearchMenu from './components/SearchMenu/SearchMenu';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { ConfigContext } from './context/ConfigApiContext';
import { MovieContext } from './context/MovieContext';

function App() {
  const Config = useContext(ConfigContext);
  const selectedMovie = useContext(MovieContext);

  return (
    <div className="App">
      <div>
        <div className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
        </div>
        <div className="left-Menu">
          {Config && selectedMovie && <SearchMenu />}
        </div>
      </div>
      <div className="movie-details">
        {Config && selectedMovie && <MovieDetails />}
      </div>
    </div>
  );
}

export default App;

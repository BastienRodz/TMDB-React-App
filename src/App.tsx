import React from 'react';
import './App.css';
import logo from './assets/logo.png';
import SearchMenu from './components/SearchMenu';

function App() {
  return (
    <div>
      <body>
        <div className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
        </div>
        <div className="left-Menu">
          <SearchMenu />
        </div>
      </body>
    </div>
  );
}

export default App;

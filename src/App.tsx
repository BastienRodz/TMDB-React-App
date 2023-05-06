import React, { useContext } from 'react';
import './App.css';
import logo from './assets/logo.png';
import SearchMenu from './components/SearchMenu';
import { ConfigContext } from './context/ConfigApiContext';

function App() {
  const config = useContext(ConfigContext);

  return (
    <>
      <div className="App-header">
        <img className="App-logo" src={logo} alt="logo" />
      </div>
      <div className="left-Menu">{config && <SearchMenu />}</div>
    </>
  );
}

export default App;

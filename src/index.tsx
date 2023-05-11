import React from 'react';
import ReactDOM from 'react-dom/client';
import ConfigProvider from './contexts/ConfigApiContext';
import MovieProvider from './contexts/MovieContext';
import LanguageProvider from './contexts/LocalContext';
import './index.css';
import './utils/i18n';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider>
      <MovieProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MovieProvider>
    </ConfigProvider>
  </React.StrictMode>
);

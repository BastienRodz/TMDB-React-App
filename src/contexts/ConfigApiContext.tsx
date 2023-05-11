import React, { createContext, useContext, useState, useEffect } from 'react';

// The ConfigContext is used to get the configuration from TheMovieDB API.
// It is used to get the secure base url to display the images.
interface ConfigContextState {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

const ConfigContext = createContext<ConfigContextState | null>(null);

// This hook is used to get the configuration from TheMovieDB API.
function useConfig() {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return config;
}

function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfigContextState | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setConfig(data);
    };
    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export { ConfigContext, useConfig };
export default ConfigProvider;

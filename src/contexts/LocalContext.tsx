import React, { createContext, useState, useContext, useMemo } from 'react';

// The LocalContext is used to get the local from the user.
// It is used to get the right local for the movie title, overview, trailer, etc.
interface LocalContextState {
  local: string;
  setLocal: (local: string) => void;
}

const LocalContext = createContext<LocalContextState>({
  local: 'fr-FR',
  setLocal: () => undefined,
});

function useLocal() {
  const context = useContext(LocalContext);
  if (!context) {
    throw new Error('useLocal must be used within a LocalProvider');
  }
  return context;
}

function LocalProvider({ children }: { children: React.ReactNode }) {
  const [local, setLocal] = useState('fr-FR');

  const contextValue = useMemo(
    () => ({
      local,
      setLocal,
    }),
    [local]
  );

  return (
    <LocalContext.Provider value={contextValue}>
      {children}
    </LocalContext.Provider>
  );
}

export { useLocal, LocalContext };
export default LocalProvider;

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Movie } from '../types.d';

interface MovieContextProps {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

const MovieContext = createContext<MovieContextProps>({
  selectedMovie: null,
  setSelectedMovie: () => undefined,
});

const useMovie = (): MovieContextProps => useContext(MovieContext);

function MovieProvider({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const contextValue = useMemo<MovieContextProps>(
    () => ({
      selectedMovie,
      setSelectedMovie,
    }),
    [selectedMovie, setSelectedMovie]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, useMovie };
export default MovieProvider;

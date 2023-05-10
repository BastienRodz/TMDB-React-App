import { Movie } from '../../types.d';
import { ReactComponent as TomatoSvg } from '../../assets/food-tomato.svg';

interface MovieScoresProps {
  movie: Movie;
}

// This component is used to display the movie release date, rating and adult flag when needed.
function MovieScores({ movie }: MovieScoresProps) {
  const movieDate = (movieItem: Movie) => {
    const date = new Date(movieItem.release_date).getFullYear();
    const str = `${date.toString()} `;
    return str;
  };

  // This function is used to modify the tomato color depending on the vote average.
  const tomatoColor = (voteAverage: number) => {
    const hueRotateValue = (() => {
      if (voteAverage >= 9) return 0;
      if (voteAverage >= 8) return 15;
      if (voteAverage >= 7) return 30;
      if (voteAverage >= 6) return 45;
      if (voteAverage >= 5) return 60;
      if (voteAverage >= 4) return 75;
      if (voteAverage >= 3) return 90;
      if (voteAverage >= 2) return 105;
      if (voteAverage >= 1) return 120;
      return 135;
    })();
    return (
      <TomatoSvg
        style={{
          filter: `hue-rotate(${hueRotateValue}deg)`,
          maxHeight: '1.5em',
        }}
      />
    );
  };

  // This function is used to display the movie rating.
  // If the movie has less than 20 votes, we don't display the rating because it's not relevant.
  const movieRating = (movieItem: Movie) => {
    const { vote_average, vote_count } = movieItem;
    if (vote_count >= 20) {
      const img = tomatoColor(vote_average);
      return (
        <>
          <span style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>-</span>
          <span style={{ minWidth: '1.5em' }}>{img}</span>
          <span>{vote_average.toFixed(1).toString()}</span>
        </>
      );
    }
    return null;
  };

  // This function is used to display the 🔞 flag when the movie is for adults only.
  const movieClassification = (movieItem: Movie) => {
    const { adult } = movieItem;
    if (adult)
      return (
        <>
          <span style={{ marginLeft: '0.5em', marginRight: '0,.5em' }}>-</span>
          <span style={{ fontSize: '1.5em' }}>🔞</span>
        </>
      );
    return null;
  };

  return (
    <>
      {movieDate(movie)} {movieRating(movie)} {movieClassification(movie)}
    </>
  );
}

export default MovieScores;

import { Movie } from '../../types.d';
import { ReactComponent as TomatoSvg } from '../../assets/food-tomato.svg';

function MovieScores({ movie }: { movie: Movie }): JSX.Element {
  const movieDate = (movieItem: Movie) => {
    const date = new Date(movieItem.release_date).getFullYear();
    const str = `${date.toString()} `;
    return str;
  };

  const tomatoColor = (voteAverage: number) => {
    let hueRotateValue = 0;
    if (voteAverage >= 9) {
      hueRotateValue = 0;
    } else if (voteAverage >= 8) {
      hueRotateValue = 15;
    } else if (voteAverage >= 7) {
      hueRotateValue = 30;
    } else if (voteAverage >= 6) {
      hueRotateValue = 45;
    } else if (voteAverage >= 5) {
      hueRotateValue = 60;
    } else if (voteAverage >= 4) {
      hueRotateValue = 75;
    } else if (voteAverage >= 3) {
      hueRotateValue = 90;
    } else if (voteAverage >= 2) {
      hueRotateValue = 105;
    } else if (voteAverage >= 1) {
      hueRotateValue = 120;
    } else {
      hueRotateValue = 135;
    }
    return (
      <TomatoSvg
        style={{
          filter: `hue-rotate(${hueRotateValue}deg)`,
          maxHeight: '1.5em',
        }}
      />
    );
  };

  const movieRating = (movieItem: Movie) => {
    const { vote_average, vote_count } = movieItem;
    if (vote_count >= 20) {
      const img = tomatoColor(vote_average);
      return (
        <>
          <span style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>-</span>
          {img}
          <span>{vote_average.toFixed(1).toString()}</span>
        </>
      );
    }
    return null;
  };

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

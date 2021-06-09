import { useFirestore } from "../../contexts/firebase/firestore.context";
import useFetch from '../../hooks/useFetch';

import MovieListItem from './MovieListItem';
import styles from './FilteredMovieList.module.scss';

const MovieList = ({filter}) => {
  const [data, isLoading, error] = useFetch('discover/movie', filter)
  const movies = data.results;
  let filteredMovies = movies;
  if (filter.includes('release_year.lte') && movies) {
    filteredMovies = movies.sort(
      (a, b) => 
      a.release_date < b.release_date
    )
  };
  if (filter.includes('sort_by=release_date') && movies) {
    let firstFilter = movies.sort(
      (a, b) => 
      a.release_date > b.release_date
    );
    filteredMovies = firstFilter.filter(movie => parseInt(movie.release_date) > 2021)
    //console.log(filteredMovies)
  };
  if (!!movies && movies.length > 0) filteredMovies = filteredMovies.filter(movie => movie.poster_path !== null).slice(0, 6);
  
  return (
    <div className={styles.movieList}>
      {isLoading && <p>Loading...</p>}
      {!!movies && filteredMovies.map(movie => {
        return (
          <MovieListItem key={movie.id} movie={movie} />
        )
      })}
      {!!movies && movies.length < 1 && <p>No data.</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
};

export default MovieList;
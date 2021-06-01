import { useFirestore } from "../../contexts/firebase/firestore.context";
import useFetch from '../../hooks/useFetch';

import MovieListItem from './MovieListItem';
import styles from './MovieList.module.scss';

const MovieList = ({itemsPerPage = 10}) => {
  
  const [data, isLoading, error] = useFetch('discover/movie')
  const movies = data.results;
  console.log(data.results);
  return (
    <div className={styles.movieList}>
      {isLoading && <p>Loading...</p>}
      {!!movies && movies.map(movie => {
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
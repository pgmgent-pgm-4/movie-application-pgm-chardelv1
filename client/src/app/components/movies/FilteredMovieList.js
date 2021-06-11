import useFetch from '../../hooks/useFetch';

import MovieListItem from './MovieListItem';
import styles from './FilteredMovieList.module.scss';
import dayjs from "dayjs";

const MovieList = ({filter}) => {
  const [data, isLoading, error] = useFetch('discover/movie', filter)
  const movies = data.results;
  let filteredMovies = movies;
  if (filter.includes('primary_release_year=2021') && movies) {
    filteredMovies = filteredMovies.sort((a, b) => {
      if (dayjs(a.release_date).$M < dayjs(b.release_date).$M) {
        return 1;
      } else if (dayjs(a.release_date).$M === dayjs(b.release_date).$M) {
        if (dayjs(a.release_date).$D < dayjs(b.release_date).$D) {
          return 1
        } else if (dayjs(a.release_date).$D === dayjs(b.release_date).$D) {
          return 0;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
  };
  if (filter.includes('sort_by=release_date') && movies && (!filter.includes('&release_year.lte'))) {
    filteredMovies = filteredMovies.sort((a, b) => {
      if (dayjs(a.release_date).$y > dayjs(b.release_date).$y) {
        return 1;
      } else if (dayjs(a.release_date).$y === dayjs(b.release_date).$y) {
        if (dayjs(a.release_date).$M < dayjs(b.release_date).$M) {
          return 1;
        } else if (dayjs(a.release_date).$M === dayjs(b.release_date).$M) {
          if (dayjs(a.release_date).$D < dayjs(b.release_date).$D) {
            return 1
          } else if (dayjs(a.release_date).$D === dayjs(b.release_date).$D) {
            return 0;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    }).filter(movie => dayjs(movie.release_date).$y > 2021);
  };
  if (!!movies && movies.length > 0) filteredMovies = filteredMovies.filter(movie => movie.poster_path !== null).slice(0, 10);
  
  
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
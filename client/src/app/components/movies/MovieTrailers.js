import React from 'react'
import useFetch from '../../hooks/useFetch';
import MovieTrailer from './MovieTrailer';
import styles from './MovieTrailers.module.scss';

const MovieTrailers = () => {
  const [data, isLoading, error] = useFetch('discover/movie', '&sort_by=popularity.desc')
  let results = data.results;
  let movies = [];
  if (!!results) movies = results.slice(0,6)

  return (
    <div className={styles.movieTrailers}>
      {isLoading && <p>Loading...</p>}
      {!!movies && movies.map(movie => <MovieTrailer key={movie.id} id={movie.id}/>)}
      {error && <p>Error. Could not load movies. {error.message}</p>}
    </div>
  )
}


export default MovieTrailers

import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

import MovieFilters from './MovieFilters';
import MovieListItem from './MovieListItem';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const [filters, setFilters] = useState();

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };
  console.log(filters);
  let fetchPath, fetchArgs = '';

  if (!!filters && !!filters.query[0] != '') {
    fetchPath = 'search/movie';
    fetchArgs = `query='${filters.query[0]}'`
  } else if (!!filters && !!filters.genres && filters.genres.length > 0) {
    fetchPath = 'discover/movie';
    fetchArgs = `with_genres=${(filters.genres).join(',')}`
  } else {
    fetchPath = 'discover/movie';
    fetchArgs = '';
  }
  
  const [data, isLoading, error] = useFetch(fetchPath, fetchArgs);
  const movies = data.results;
  console.log(movies)

    return (
      <div className={styles.moviesContainer}>
      <section className={styles.filters}>
        <MovieFilters onFiltersChange={handleFiltersChange}/>
      </section>
      <section className={styles.results}>
        <h1>Movies</h1>
        <div className={styles.movieList}> 
          { isLoading && <p> Loading... </p>} 
          {!!movies && movies.map(movie => {
                return (
                  <MovieListItem key={movie.id} movie={movie} />
                )
              })
          } 
          { !!movies && movies.length < 1 && <p>No data.</p>}
          { error && <p>Error: {error.message}</p>} 
        </div>
      </section>
      </div>
  )
};

export default MovieList;
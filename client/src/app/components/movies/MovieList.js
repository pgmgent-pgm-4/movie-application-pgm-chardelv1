import React, { useEffect, useState } from 'react';
import { appConfig } from '../../config';
// import useFetch from '../../hooks/useFetch';

import MovieFilters from './MovieFilters';
import MovieListItem from './MovieListItem';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const [filters, setFilters] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let fetchPath, fetchArgs = '';
  if (!!filters && !!filters.query[0] != '') {
    fetchPath = 'search/movie';
    fetchArgs = `&query='${filters.query[0]}'`
  } else if (!!filters && !!filters.genres && filters.genres.length > 0) {
    fetchPath = 'discover/movie';
    fetchArgs = `&with_genres=${(filters.genres).join(',')}`
  } else {
    fetchPath = 'discover/movie';
    fetchArgs = '';
  };

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  let apiUrl = `https://api.themoviedb.org/3/${fetchPath}?api_key=${appConfig.tmdbApiKey}${fetchArgs}`;

  const getData = async () => {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [apiUrl])

  const movies = data.results;

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
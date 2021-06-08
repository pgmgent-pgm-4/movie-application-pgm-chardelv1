import { useCallback, useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useFirestore } from '../../contexts/firebase/firestore.context';

import * as Routes from '../../routes';

import styles from './MovieListItem.module.scss';

const MovieListItem = ({ movie }) => {
  const [dbMovie, setDbMovie] = useState();
  const { getMovieById } = useFirestore();
  console.log(movie.id)
  
  const fetchData = useCallback(
    async () => {
      try {
        const data = await getMovieById((movie.id).toString());
        setDbMovie(data);
      } catch (err) {
        console.error(err, (movie.id).toString())
      }
      },
      [getMovieById, (movie.id).toString()]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  console.log(dbMovie);
  const parseReleaseDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }
  return (
    <article className={styles.movielistItem}>
      <Link to={Routes.MOVIE_DETAILS.replace(':id', movie.id)}>
      <picture className={styles.picture}>
      <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{movie.vote_average}</span>
        <h3 className={styles.title}>{ movie.title }</h3>
        <p>Release date: {parseReleaseDate(movie.release_date)}</p>
      </div>
      <ul>
       
      </ul>
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ movie.vote_count }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ Math.floor(movie.popularity) }</span></span>
      </footer>   
      </Link>
    </article>
  )
};

export default MovieListItem;
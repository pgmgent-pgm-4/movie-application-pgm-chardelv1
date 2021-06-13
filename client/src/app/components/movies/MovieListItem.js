import { useCallback, useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { useFirestore } from '../../contexts/firebase/firestore.context';
import * as Routes from '../../routes';
import styles from './MovieListItem.module.scss';

const MovieListItem = ({ movie, type = 'remote' }) => {
  const [dbMovie, setDbMovie] = useState();
  const { getMovieById } = useFirestore();
  
  const fetchData = useCallback(
    async () => {
      try {
        const data = await getMovieById((movie.id).toString());
        setDbMovie(data);
      } catch (err) {
        // Stop the app from throwing errors when a movie is not in the firestore database
      }
    },
    [getMovieById, (movie.id).toString()]
  );

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const parseReleaseDate = (date) => {
    return (dayjs(date)).format('DD/MM/YYYY');
  }
  return (
    <article className={styles.movielistItem}>
      <Link to={Routes.MOVIE_DETAILS.replace(':id', movie.id)}>
      <picture className={styles.picture}>
      {!!movie.poster_path && <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />}
      {!(!!movie.poster_path) && <img src='https://api.acomart.tv/images/video-placeholder.jpg' alt={movie.name} />}
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.floor(movie.vote_average*10)}<sup>%</sup></span>
        <h3 className={styles.title}>{ movie.title }</h3>
        <p>Release date: {parseReleaseDate(movie.release_date)}</p>
      </div>
      <ul>
       
      </ul>
      <footer className={styles.meta}>
        {dbMovie && <span className={styles.numReviews}><VscPreview /><span>{ dbMovie.numReviews }</span></span>}
        {!dbMovie && <span className={styles.numReviews}><VscPreview /><span>{ movie.vote_count }</span></span>}
        {dbMovie && <span className={styles.numViews}><FiEye /><span>{ dbMovie.numViews }</span></span>}
        {!dbMovie && <span className={styles.numViews}><FiEye /><span>{(Math.round(movie.popularity))}</span></span>}
      </footer>   
      </Link>
    </article>
  )
};

export default MovieListItem;
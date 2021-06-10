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
  
  const fetchData = useCallback(
    async () => {
      try {
        const data = await getMovieById((movie.id).toString());
        setDbMovie(data);
      } catch (err) {
        console.log(movie.id)
        console.error(err, (movie.id).toString())
      }
    },
    [getMovieById, (movie.id).toString()]
  );

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  //console.log(dbMovie);
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
        {dbMovie && <span className={styles.rating}>{Math.round(dbMovie.avgRating / 5 * 100)}<sup>%</sup></span>}
        <h3 className={styles.title}>{ movie.title }</h3>
        <p>Release date: {parseReleaseDate(movie.release_date)}</p>
      </div>
      <ul>
       
      </ul>
      <footer className={styles.meta}>
        {dbMovie && <span className={styles.numReviews}><VscPreview /><span>{ dbMovie.numReviews }</span></span>}
        {dbMovie && <span className={styles.numViews}><FiEye /><span>{ dbMovie.numViews }</span></span>}
        {!dbMovie && <p>{movie.id}</p>}
      </footer>   
      </Link>
    </article>
  )
};

export default MovieListItem;
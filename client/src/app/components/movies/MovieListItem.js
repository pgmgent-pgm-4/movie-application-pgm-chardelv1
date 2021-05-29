import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import * as Routes from '../../routes';

import styles from './MovieListItem.module.scss';

const MovieListItem = ({ movie }) => {
  console.log(movie);

  return (
    <article className={styles.movielistItem}>
      <picture className={styles.picture}>
      <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{movie.vote_average}</span>
        <h3 className={styles.title}><Link to={Routes.MOVIE_DETAILS.replace(':id', movie.id)}>{ movie.title }</Link></h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ movie.vote_count }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ Math.floor(movie.popularity) }</span></span>
      </footer>   
    </article>
  )
};

export default MovieListItem;
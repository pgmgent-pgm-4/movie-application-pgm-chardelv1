import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import * as Routes from '../../routes';

import styles from './MovieListItem.module.scss';

const MovieListItem = ({ movie }) => {
  console.log(movie);

  return (
    <article className={styles.movielistItem}>      
      {/* <picture className={styles.picture}>
        <img src={movie.thumbnailURL} alt={movie.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.round(movie.avgRating / 5 * 100)}</span>
        <h3 className={styles.title}><Link to={Routes.MOVIE_DETAILS.replace(':id', movie.uid)}>{ movie.title }</Link></h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ movie.numReviews }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ movie.numViews }</span></span>
      </footer>    */}
    </article>
  )
};

export default MovieListItem;
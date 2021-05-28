import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import styles from './MovieDetails.module.scss';

const MovieDetails = ({ movie }) => {
  return (
    <article className={styles.movielistItem}>      
      <picture className={styles.picture}>
        <img src={movie.thumbnailURL} alt={movie.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.round(movie.avgRating / 5 * 100)}</span>
        <h3 className={styles.title}>{ movie.title }</h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ movie.numReviews }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ movie.numViews }</span></span>
      </footer>   
    </article>
  )
};

export default MovieDetails;
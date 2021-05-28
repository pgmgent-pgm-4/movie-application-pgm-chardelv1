import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import styles from './ShowDetails.module.scss';

const ShowDetails = ({ show }) => {
  return (
    <article className={styles.showlistItem}>      
      <picture className={styles.picture}>
        <img src={show.thumbnailURL} alt={show.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.round(show.avgRating / 5 * 100)}</span>
        <h3 className={styles.title}>{ show.title }</h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ show.numReviews }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ show.numViews }</span></span>
      </footer>   
    </article>
  )
};

export default ShowDetails;
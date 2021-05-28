import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import * as Routes from '../../routes';

import styles from './ShowListItem.module.scss';

const ShowListItem = ({ show }) => {
  return (
    <article className={styles.showlistItem}>      
      <picture className={styles.picture}>
        <img src={show.thumbnailURL} alt={show.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.round(show.avgRating / 5 * 100)}</span>
        <h3 className={styles.title}><Link to={Routes.SHOW_DETAILS.replace(':id', show.uid)}>{ show.title }</Link></h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ show.numReviews }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ show.numViews }</span></span>
      </footer>   
    </article>
  )
};

export default ShowListItem;
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import * as Routes from '../../routes';

import styles from './ShowListItem.module.scss';

const ShowListItem = ({ show }) => {
  return (
    <article className={styles.showlistItem}>      
      <picture className={styles.picture}>
        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`} alt={show.name} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{show.vote_average}</span>
        <h3 className={styles.title}><Link to={Routes.TVSHOW_DETAILS.replace(':id', show.id)}>{ show.name }</Link></h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ show.vote_count }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ Math.floor(show.popularity) }</span></span>
      </footer>   
    </article>
  )
};

export default ShowListItem;
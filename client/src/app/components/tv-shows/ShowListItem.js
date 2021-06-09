import { useCallback, useEffect, useState } from 'react';
import { useFirestore } from '../../contexts/firebase/firestore.context';
import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import * as Routes from '../../routes';

import styles from './ShowListItem.module.scss';


const ShowListItem = ({ show }) => {
  const [tvShow, setTvShow] = useState();
    const { getTvShowById } = useFirestore();
    //console.log(show.id)
    
    const fetchData = useCallback(
      async () => {
        try {
          const data = await getTvShowById((show.id).toString());
          setTvShow(data);
        } catch (err) {
          console.error(err, (show.id).toString())
        }
        },
        [getTvShowById, (show.id).toString()]);

    useEffect(() => {
      fetchData()
    }, [fetchData]);
    
  const parseReleaseDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  };
  console.log(show)
  return (
    <article className={styles.showlistItem}>
      <Link to={Routes.TVSHOW_DETAILS.replace(':id', show.id)}>
      <picture className={styles.picture}>
        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`} alt={show.name} />
      </picture>
      <div className={styles.content}>
        {tvShow && <span className={styles.rating}>{Math.round(tvShow.avgRating / 5 * 100)}<sup>%</sup></span>}
        <h3 className={styles.title}>{ show.name }</h3>
        <p>First aired on: {parseReleaseDate(show.first_air_date)}</p>
      </div>   
      <footer className={styles.meta}>
        {tvShow && <span className={styles.numReviews}><VscPreview /><span>{ tvShow.numReviews }</span></span>}
        {tvShow && <span className={styles.numViews}><FiEye /><span>{ tvShow.numViews }</span></span>}
        {!tvShow && <p>{show.id}</p>}
      </footer>   
      </Link>
    </article>
  )
};

export default ShowListItem;
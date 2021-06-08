import { useFirestore } from "../../contexts/firebase/firestore.context";
import useFetch from '../../hooks/useFetch';

import ShowListItem from './MovieListItem';
import styles from './FilteredShowList.module.scss';

const ShowList = ({filter}) => {
  const [data, isLoading, error] = useFetch('discover/tv', filter)
  const tv = data.results;
  let filteredShows = tv;
  if (filter.includes('release_year.lte') && tv) {
    filteredShows = tv.sort(
      (a, b) => 
      a.release_date < b.release_date
    )
  };
  if (filter.includes('sort_by=release_date') && tv) {
    let firstFilter = tv.sort(
      (a, b) => 
      a.release_date > b.release_date
    );
    filteredShows = firstFilter.filter(show => parseInt(show.release_date) > 2021)
    console.log(filteredShows)
  };
  if (!!tv && tv.length > 0) filteredShows = filteredShows.filter(show => show.poster_path !== null).slice(0, 6);
  
  return (
    <div className={styles.showList}>
      {isLoading && <p>Loading...</p>}
      {!!tv && filteredShows.map(show => {
        return (
          <ShowListItem key={show.id} show={show} />
        )
      })}
      {!!tv && tv.length < 1 && <p>No data.</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
};

export default ShowList;
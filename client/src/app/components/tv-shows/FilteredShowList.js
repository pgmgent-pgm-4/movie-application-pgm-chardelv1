import useFetch from '../../hooks/useFetch';

import ShowListItem from './ShowListItem';
import styles from './FilteredShowList.module.scss';

const ShowList = ({filter}) => {
  const [data, isLoading, error] = useFetch('discover/tv', filter)
  const tv = data.results;
  let filteredShows = tv;
  
  if (filter.includes('first_air_date.gte=2021') && tv) {
    let firstFilter = tv.sort(
      (a, b) => 
      a.first_air_date.split('-')[0] > b.first_air_date.split('-')[0]
    );
    filteredShows = firstFilter.filter(show => parseInt(show.first_air_date_year) !== 1970)
  };
  if (!!tv && tv.length > 0) filteredShows = filteredShows.filter(show => show.poster_path !== null)//.slice(0, 6); 
  
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
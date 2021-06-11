import useFetch from '../../hooks/useFetch';

import ShowFilters from './ShowFilters';
import ShowListItem from './ShowListItem';
import styles from './ShowList.module.scss';

const ShowList = () => {
    const [data, isLoading, error] = useFetch('discover/tv');
    const shows = data.results;
    
    return ( 
      <div className={styles.showsContainer}>
      <section className={styles.filters}>
        <ShowFilters />
      </section>
      <section className={styles.results}>
        <div className={styles.showList}> 
          { isLoading && <p> Loading... </p>} 
          {!!shows && shows.map(show => {
                return (
                  <ShowListItem key={show.id} show={show} />
                )
              })
          } 
          { !!shows && shows.length < 1 && <p>No data.</p>}
          { error && <p>Error: {error.message}</p>} 
        </div>
      </section>
      </div>
    )};

          export default ShowList;
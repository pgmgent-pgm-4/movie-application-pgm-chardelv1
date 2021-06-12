import { useEffect, useState } from 'react';
import { appConfig } from '../../config';
import ShowFilters from './ShowFilters';
import ShowListItem from './ShowListItem';
import styles from './ShowList.module.scss';

const ShowList = () => {
  const [filters, setFilters] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let fetchPath, fetchArgs = '';
  if (!!filters && !!filters.query[0] != '') {
    fetchPath = 'search/tv';
    fetchArgs = `&query='${filters.query[0]}'`
  } else if (!!filters && !!filters.genres && filters.genres.length > 0) {
    fetchPath = 'discover/tv';
    fetchArgs = `&with_genres=${(filters.genres).join(',')}`
  } else {
    fetchPath = 'discover/tv';
    fetchArgs = '';
  };

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  let apiUrl = `https://api.themoviedb.org/3/${fetchPath}?api_key=${appConfig.tmdbApiKey}${fetchArgs}`;

  const getData = async () => {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [apiUrl])

  const shows = data.results;

  
  return ( 
    <div className={styles.showsContainer}>
    <section className={styles.filters}>
      <ShowFilters onFiltersChange={handleFiltersChange}/>
    </section>
    <section className={styles.results}>
      <h1>TV</h1>
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
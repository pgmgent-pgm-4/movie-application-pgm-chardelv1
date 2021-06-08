import {
  useState,
  useEffect
} from 'react';

import {
  useFirestore
} from "../../contexts/firebase/firestore.context";
import useFetch from '../../hooks/useFetch';

import ShowListItem from './ShowListItem';
import styles from './ShowList.module.scss';

const ShowList = ({itemsPerPage = 10}) => {
    const [tvShows, setTvShows] = useState();
    const {getTvShows} = useFirestore();
    const [data, isLoading, error] = useFetch('discover/tv');
    const shows = data.results;
    console.log(shows);

    const fetchData = useCallback(
      async () => {
          const data = await getPagedTvShows(itemsPerPage);
          setTvShows(data.tvShows);
        },
        [getPagedTvShows, itemsPerPage]);

    useEffect(() => {
      fetchData()
    }, [fetchData])

    return ( 
      <div className = { styles.showList }> 
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
    )};

          export default ShowList;
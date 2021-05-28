import { useState, useEffect } from 'react';

import { useFirestore } from "../../contexts/firebase/firestore.context";

import ShowListItem from './ShowListItem';

const ShowList = ({itemsPerPage = 10}) => {
  const [ shows, setShows ] = useState();
  const [ lastVisible, setLastVisible ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);
  const { getPagedShows } = useFirestore();
  
  useEffect(() => {
    fetchData();    
  }, []);

  const fetchData = async () => {
    const data = await getPagedShows(itemsPerPage, lastVisible);
    if (lastVisible === null || (lastVisible.uid !== data.lastVisibleDoc)) {
      setLastVisible(data.lastVisibleDoc);
      setShows(data.shows);
    }    
  };

  return (
    <div className="show-list">
      {!!shows && shows.map(show => {
        return (
          <ShowListItem key={show.uid} show={show} />
        )
      })}
      {!!shows && <button onClick={() => fetchData()}>MORE</button>}
    </div>
  )
};

export default ShowList;
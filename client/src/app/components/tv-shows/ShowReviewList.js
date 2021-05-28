import { useState, useEffect } from 'react';

import { useFirestore } from "../../contexts/firebase/firestore.context";

import ShowReviewListItem from './ShowReviewListItem';

const ShowReviewList = ({showId}) => {
  const [ showReviews, setShowReviews ] = useState();
  const { getShowReviews } = useFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShowReviews(showId);
      setShowReviews(data);
    };

    fetchData();    
  }, [getShowReviews, showId])

  return (
    <div className="show-review-list">
      {!!showReviews && showReviews.map(showReview => {
        return (
          <ShowReviewListItem key={showReview.uid} showReview={showReview} />
        )
      })}
    </div>
  )
};

export default ShowReviewList;
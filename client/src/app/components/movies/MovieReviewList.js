import { useState, useEffect } from 'react';

import { useFirestore } from "../../contexts/firebase/firestore.context";

import MovieReviewListItem from './MovieReviewListItem';

const MovieReviewList = ({movieId}) => {
  const [ movieReviews, setMovieReviews ] = useState();
  const { getMovieReviews } = useFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovieReviews(movieId);
      setMovieReviews(data);
    };

    fetchData();    
  }, [getMovieReviews, movieId])

  return (
    <div className="movie-review-list">
      {!!movieReviews && movieReviews.map(movieReview => {
        return (
          <MovieReviewListItem key={movieReview.uid} movieReview={movieReview} />
        )
      })}
    </div>
  )
};

export default MovieReviewList;
import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai'
import styles from './ReviewForm.module.scss';
import { useFirestore } from '../../contexts/firebase/firestore.context';

const ReviewForm = ({subjectId, subjectType}) => {
  const [dbReview, setDbReview] = useState();
  const { addMovieReview, addTvShowReview } = useFirestore();
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let reviewData = [];
    for (let entry of data) {
      const [, value] = entry;
      reviewData.push(value);
    };
    const [ rating, title, review ] = reviewData;
    const d = Date.now();
    const reviewBody = {
      createdAt: d,
      deletedAt: null,
      modifiedAt: null,
      rating: rating,
      title: title,
      review: review
    };
    setDbReview(reviewBody);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }

  const fetchData = useCallback(
    async () => {
      console.log(dbReview)
      try {
        if (subjectType === 'movie') {
          const data = await addMovieReview((subjectId).toString(), dbReview);
        }
        if (subjectType === 'tv') {
          const data = await addTvShowReview((subjectId).toString(), dbReview);
        }
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    [addMovieReview, addTvShowReview, dbReview, (subjectId).toString(), subjectType]
  );

  useEffect(() => {
    !!dbReview && fetchData()
  }, [fetchData]);

  return (
    <form className={styles.ReviewForm} onSubmit={handleSubmit}>
      <div className={styles.reviewElements}>
        <div className={styles.reviewRating}>
          <label htmlFor="rating">{rating} <AiFillStar /></label>
          <input type="range" min="0" max="5" name="rating" onChange={handleRatingChange}/>
        </div>
        <div className={styles.reviewTitle}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder="Your title"></input>
        </div>
      </div>
      <textarea name="reviewText" placeholder='Your message...' required></textarea>
      <button type="submit" value="Submit"><FiSend /></button>
    </form>
  )
}

export default ReviewForm

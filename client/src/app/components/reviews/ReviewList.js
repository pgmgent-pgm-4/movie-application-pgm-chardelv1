import React from 'react'
import styles from './ReviewList.module.scss';
import ReviewListItem from './ReviewListItem';

const ReviewList = ({reviews, amount = null}) => {
  if (!!reviews && !!amount) reviews.length = amount;
  return (
    <div>
      <h3>Reviews</h3>
      <ul className={styles.reviewList}>
        {!!reviews && reviews.map((review) => <ReviewListItem key={review.uid} review={review}/>)}
      </ul>
    </div>
  )
}

export default ReviewList

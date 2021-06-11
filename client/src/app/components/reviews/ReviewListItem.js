import React, { useCallback, useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import styles from './ReviewListItem.module.scss';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
import advancedFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(advancedFormat);

const ReviewListItem = ({review}) => {
  const [readMore, setReadMore] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setReadMore(!readMore);
  }
  

  let ratingArr = [, , , , ];
  for (let i = 0; i < review.rating; i++) {
    ratingArr.push(<AiFillStar key={i}/>)
  }
  for (let i = 0; i < (5 - review.rating); i++) {
    ratingArr.push(<AiOutlineStar key={review.rating + i} />)
  }

  return (
    <article className={styles.ReviewListItem}>
      <header className={styles.reviewHeader}>
        <div className={styles.reviewRating}>{ratingArr.map((ratingIcon) => ratingIcon)}</div>
        <h3 className={styles.reviewTitle}>{(review.title).normalize()}</h3>
      </header>
      <p>Posted on: <strong>{dayjs(new Date(review.createdAt)).fromNow()}</strong></p>
      {!readMore && <p>{review.review.slice(0,140)}...</p>}
      {!!readMore && <p>{review.review}</p>}
      <button onClick={handleClick} type="button" className={styles.readMore}>{!readMore && 'Read more'}{!!readMore && 'Hide'}</button>
    </article>
  )
}

export default ReviewListItem

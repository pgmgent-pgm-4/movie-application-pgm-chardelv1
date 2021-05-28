import styles from './MovieReviewListItem.module.scss';

const MovieReviewListItem = ({ movieReview }) => {
  return (
    <article className={styles.movielistItem}> 
      <h3>{movieReview.title}</h3>
      <div>
        {movieReview.review}
      </div>
      <span>{movieReview.rating}</span>
    </article>
  )
};

export default MovieReviewListItem;
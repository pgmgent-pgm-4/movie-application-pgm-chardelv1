import styles from './ShowReviewListItem.module.scss';

const ShowReviewListItem = ({ showReview }) => {
  return (
    <article className={styles.showlistItem}> 
      <h3>{showReview.title}</h3>
      <div>
        {showReview.review}
      </div>
      <span>{showReview.rating}</span>
    </article>
  )
};

export default ShowReviewListItem;
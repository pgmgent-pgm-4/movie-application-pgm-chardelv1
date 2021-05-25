import styles from './ProjectReviewListItem.module.scss';

const ProjectReviewListItem = ({ projectReview }) => {
  return (
    <article className={styles.projectlistItem}> 
      <h3>{projectReview.title}</h3>
      <div>
        {projectReview.review}
      </div>
      <span>{projectReview.rating}</span>
    </article>
  )
};

export default ProjectReviewListItem;
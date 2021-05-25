import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";

import styles from './ProjectDetails.module.scss';

const ProjectDetails = ({ project }) => {
  return (
    <article className={styles.projectlistItem}>      
      <picture className={styles.picture}>
        <img src={project.thumbnailURL} alt={project.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.round(project.avgRating / 5 * 100)}</span>
        <h3 className={styles.title}>{ project.title }</h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ project.numReviews }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ project.numViews }</span></span>
      </footer>   
    </article>
  )
};

export default ProjectDetails;
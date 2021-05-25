import { FiEye } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import * as Routes from '../../routes';

import styles from './ProjectListItem.module.scss';

const ProjectListItem = ({ project }) => {
  return (
    <article className={styles.projectlistItem}>      
      <picture className={styles.picture}>
        <img src={project.thumbnailURL} alt={project.title} />
      </picture>
      <div className={styles.content}>
        <span className={styles.rating}>{Math.round(project.avgRating / 5 * 100)}</span>
        <h3 className={styles.title}><Link to={Routes.PROJECT_DETAILS.replace(':id', project.uid)}>{ project.title }</Link></h3>
      </div>   
      <footer className={styles.meta}>
        <span className={styles.numReviews}><VscPreview /><span>{ project.numReviews }</span></span>
        <span className={styles.numViews}><FiEye /><span>{ project.numViews }</span></span>
      </footer>   
    </article>
  )
};

export default ProjectListItem;
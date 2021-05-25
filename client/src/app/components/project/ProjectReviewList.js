import { useState, useEffect } from 'react';

import { useFirestore } from "../../contexts/firebase/firestore.context";

import ProjectReviewListItem from './ProjectReviewListItem';

const ProjectReviewList = ({projectId}) => {
  const [ projectReviews, setProjectReviews ] = useState();
  const { getProjectReviews } = useFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectReviews(projectId);
      setProjectReviews(data);
    };

    fetchData();    
  }, [getProjectReviews, projectId])

  return (
    <div className="project-review-list">
      {!!projectReviews && projectReviews.map(projectReview => {
        return (
          <ProjectReviewListItem key={projectReview.uid} projectReview={projectReview} />
        )
      })}
    </div>
  )
};

export default ProjectReviewList;
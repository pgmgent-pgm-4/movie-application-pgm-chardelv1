import { useState, useEffect } from 'react';

import { useFirestore } from "../../contexts/firebase/firestore.context";

import ProjectListItem from './ProjectListItem';

const ProjectList = ({itemsPerPage = 10}) => {
  const [ projects, setProjects ] = useState();
  const [ lastVisible, setLastVisible ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);
  const { getPagedProjects } = useFirestore();
  
  useEffect(() => {
    fetchData();    
  }, []);

  const fetchData = async () => {
    const data = await getPagedProjects(itemsPerPage, lastVisible);
    if (lastVisible === null || (lastVisible.uid !== data.lastVisibleDoc)) {
      setLastVisible(data.lastVisibleDoc);
      setProjects(data.projects);
    }    
  };

  return (
    <div className="project-list">
      {!!projects && projects.map(project => {
        return (
          <ProjectListItem key={project.uid} project={project} />
        )
      })}
      {!!projects && <button onClick={() => fetchData()}>MORE</button>}
    </div>
  )
};

export default ProjectList;
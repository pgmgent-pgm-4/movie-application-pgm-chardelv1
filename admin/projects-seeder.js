import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';

const GDMGENT_API_CASES = 'https://www.gdm.gent/static/data/cases.json';

(async () => {
  // Get projects collection
  let collectionRef = db.collection('projects');

  // Create a Project
  const createProject = (project) => {
    // Add a document via project object
    const data = {
      title: project.Title,
      description: project.Description,
      thumbnailURL: project.Picture,
      ...generateTimestamps()
    };

    collectionRef.doc(uuidv4()).set(data).then(documentReference => {
      console.log(`Added project.`);
    });
  };

  // Create projects via promises
  const createProjects = async () => {
    const response = await fetch(`${GDMGENT_API_CASES}`);
    const jsonData = await response.json();

    db.collection('counters').doc('projects').set({numAmount: jsonData.length}, {merge: true});

    const promises = [];
    jsonData.forEach(project => {
      promises.push(createProject(project));
    });
    return await Promise.all(promises);
  };

  await createProjects(); 
})();
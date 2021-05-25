import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  // Get all users
  let users = await auth.listUsers(1000, undefined);

  // Get all projects
  let projectsRef = db.collection('projects');
  const query = projectsRef.orderBy('createdAt', 'desc');
  const querySnapshot = await query.get();
  const projects = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  });

  projects.forEach(project => {
    let viewsRef = db.collection('projects').doc(project.uid).collection('views');
    let numViews = generateValueBetweenMinAndMax(0, 100), usersCopy = JSON.parse(JSON.stringify(users.users)), userStart = null, userId = 0;
    for (let i = 0; i < numViews;i++) {
      userStart = Math.floor(Math.random()*usersCopy.length);
      userId = usersCopy.slice(userStart, userStart + 1)[0].uid;
      viewsRef.doc(userId).set({
        firstVisitedAt: Date.now()
      });
    }

    projectsRef.doc(project.uid).update({
      numViews: numViews,
      modifiedAt: Date.now(),
    });  
  });

})();
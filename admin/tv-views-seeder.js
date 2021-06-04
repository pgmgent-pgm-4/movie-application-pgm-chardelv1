import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  // Get all users
  let users = await auth.listUsers(1000, undefined);

  // Get all TV shows
  let tvRef = db.collection('tv');
  const query = tvRef.orderBy('createdAt', 'desc');
  const querySnapshot = await query.get();
  const tvShows = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  });

  tvShows.forEach(tvShow => {
    let viewsRef = db.collection('tv').doc(tvShow.uid).collection('views');
    let numViews = generateValueBetweenMinAndMax(0, 100), usersCopy = JSON.parse(JSON.stringify(users.users)), userStart = null, userId = 0;
    for (let i = 0; i < numViews;i++) {
      userStart = Math.floor(Math.random()*usersCopy.length);
      userId = usersCopy.slice(userStart, userStart + 1)[0].uid;
      viewsRef.doc(userId).set({
        firstVisitedAt: Date.now()
      });
    }

    tvRef.doc(tvShow.uid).update({
      numViews: numViews,
      modifiedAt: Date.now(),
    });  
  });

})();
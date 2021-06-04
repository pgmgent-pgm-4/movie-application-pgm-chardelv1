import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
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
    let commentsRef = db.collection('tv').doc(tvShow.uid).collection('comments');
    // Make comments
    let numComments = generateValueBetweenMinAndMax(0, 100), usersCopy = JSON.parse(JSON.stringify(users.users)), userStart = null, userId = 0;
    for (let i = 0; i < numComments; i++) {
      userStart = generateValueBetweenMinAndMax(0, usersCopy.length - 1);
      userId = usersCopy.slice(userStart, userStart + 1)[0].uid;
      commentsRef.doc(userId).set({
        text: faker.lorem.paragraphs(generateValueBetweenMinAndMax(1, 3)),
        spammedDate: null,
        comments: null,
        ...generateTimestamps()
      });
    }

    tvRef.doc(tvShow.uid).update({
      modifiedAt: Date.now(),
    });  
  });

})();
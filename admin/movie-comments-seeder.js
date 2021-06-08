import { admin, app, auth, db, generateTimestamps, generateValueBetweenMinAndMax } from './firebase';
import faker from 'faker';
(async () => {
  // Get all users
  let users = await auth.listUsers(1000, undefined);

  // Get all TV shows
  let movieRef = db.collection('movies');
  const query = movieRef.orderBy('createdAt', 'desc');
  const querySnapshot = await query.get();
  const movies = querySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data()
    }
  });

  movies.forEach(movie => {
    let commentsRef = db.collection('movies').doc(movie.uid).collection('comments');
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

    movieRef.doc(movie.uid).update({
      modifiedAt: Date.now(),
    });  
  });

})();
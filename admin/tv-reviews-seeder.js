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
    let reviewsRef = db.collection('tv').doc(tvShow.uid).collection('reviews');
    // Make reviews
    let numReviews = generateValueBetweenMinAndMax(0, 100), usersCopy = JSON.parse(JSON.stringify(users.users)), sumRatings = 0, userStart = null, rating = 0, userId = 0;
    for (let i = 0; i < numReviews;i++) {
      userStart = generateValueBetweenMinAndMax(0, usersCopy.length - 1);
      userId = usersCopy.slice(userStart, userStart + 1)[0].uid;
      rating = generateValueBetweenMinAndMax(0, 5);
      reviewsRef.doc(userId).set({
        title: faker.lorem.sentence(),
        review: faker.lorem.paragraphs(generateValueBetweenMinAndMax(1, 7)),
        rating: rating,
        ...generateTimestamps()
      });
      sumRatings += rating;
    }

    tvRef.doc(tvShow.uid).update({
      numReviews: numReviews,
      avgRating: sumRatings/numReviews,
      modifiedAt: Date.now(),
    });  
  });

})();
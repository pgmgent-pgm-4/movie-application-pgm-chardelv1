import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';
import fetchData from './fetchData';

(async () => {
  // Get TV collection
  let collectionRef = db.collection('tv');
  
  // Create a TV show
  const createTvShow = (tvShow) => {
    // Add a document via tvShow object
    const data = {
      name: tvShow.name,
      ...generateTimestamps()
    };

    collectionRef.doc((tvShow.id).toString()).set(data).then(documentReference => {
      console.log(`Added tvShow.`);
    });
  };

  // Create TV shows via promises
  const createTvShows = async (page) => {
    try {
      const response = await fetchData('discover/tv', `&page=${page}`);
      const jsonData = await response.json();

      const promises = [];
      jsonData.results.forEach(tvShow => {
        promises.push(createTvShow(tvShow));
      });
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  };

  await createTvShows(1);
/*   await createTvShows(5);
  await createTvShows(10); */
  const nShows = await (await db.collection('tv').get()).size;
  console.log(nShows)
  db.collection('counters').doc('tv').set({numAmount: nShows}, {merge: true});
})();
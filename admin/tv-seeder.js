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
      const response1 = await fetchData('discover/tv', `&sort_by=popularity.desc`);
      const jsonData1 = await response1.json();
      const response2 = await fetchData('discover/tv', `&sort_by=first_air_date&first_air_date_year=2021&timezone=America%2FNew_York&language=en_US`);
      const jsonData2 = await response2.json();
      const response3 = await fetchData('discover/tv', '&sort_by=first_air_date.desc&first_air_date.gte=2021&timezone=America%2FNew_York&language=en_US');
      const jsonData3 = await response3.json();

      const promises = [];
      jsonData1.results.forEach(tvShow => {
        promises.push(createTvShow(tvShow));
      });
      
      jsonData2.results.forEach(tvShow => {
        promises.push(createTvShow(tvShow));
      });

      jsonData3.results.forEach(tvShow => {
        promises.push(createTvShow(tvShow));
      });

      db.collection('counters').doc('tv').set({numAmount: jsonData1.results.length * 3}, {merge: true});
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  };

  await createTvShows(1);
})();
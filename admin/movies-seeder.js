import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';
import fetchData from './fetchData';

(async () => {
  // Get movies collection
  let collectionRef = db.collection('movies');
  
  // Create a Movie
  const createMovie = (movie) => {
    // Add a document via movie object
    const data = {
      id: movie.id,
      title: movie.title,
      ...generateTimestamps()
    };

    collectionRef.doc((movie.id).toString()).set(data).then(documentReference => {
      console.log(`Added movie.`);
    });
  };

  // Create movies via promises
  const createMovies = async (page) => {
    try {
      const response1 = await fetchData('discover/movie', `&sort_by=popularity.desc`);
      const jsonData1 = await response1.json();
      const response2 = await fetchData('discover/movie', `&release_year.lte'2022'`);
      const jsonData2 = await response2.json();
      const response3 = await fetchData('discover/movie', '&sort_by=release_date.desc');
      const jsonData3 = await response3.json();
      
      const promises = [];
      jsonData1.results.forEach(movie => {
        promises.push(createMovie(movie));
      });
      jsonData2.results.forEach(movie => {
        promises.push(createMovie(movie));
      });
      jsonData3.results.forEach(movie => {
        promises.push(createMovie(movie));
      });
      db.collection('counters').doc('movies').set({numAmount: jsonData.results.length * 3}, {merge: true});
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  };

  await createMovies(1);
  // await createMovies(5);
  // await createMovies(10);

  const nMovies = await (await db.collection('movies').get()).size;
  console.log(nMovies)
  db.collection('counters').doc('movies').set({numAmount: nMovies}, {merge: true});

})();
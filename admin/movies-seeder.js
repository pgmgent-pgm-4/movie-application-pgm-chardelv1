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
      const response = await fetchData('discover/movie', `&page=${page}`);
      const jsonData = await response.json();
      console.log(jsonData)
      
      const promises = [];
      jsonData.results.forEach(movie => {
        promises.push(createMovie(movie));
      });
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
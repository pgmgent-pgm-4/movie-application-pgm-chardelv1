import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { admin, app, db, generateTimestamps } from './firebase';
import firebase from 'firebase';
import fetchData from './fetchData';

// const GDMGENT_API_CASES = 'https://www.gdm.gent/static/data/cases.json';


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

    collectionRef.doc(uuidv4()).set(data).then(documentReference => {
      console.log(`Added movie.`);
    });
  };

  // Create movies via promises
  const createMovies = async () => {
    try {
      const response = await fetchData('discover/movie', '&page=5');
      const jsonData = await response.json();
      console.log(jsonData)
      db.collection('counters').doc('movies').set({numAmount: jsonData.results.length}, {merge: true});

      const promises = [];
      jsonData.results.forEach(movie => {
        promises.push(createMovie(movie));
      });
      return await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  };

  await createMovies(); 
})();